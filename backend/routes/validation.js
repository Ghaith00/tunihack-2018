const express = require('express');
const router = express.Router();
var path = require('path');
const fs = require('fs');
const Web3 = require('web3');
const keccak256 = require('keccak256')




let web3;
if (typeof web3 === 'undefined') {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
} else {
    web3 = new Web3(web3.currentProvider);
}

router.get('/', function(req, res, next) {
    const contract = loadContract(web3);
    let key = keccak256(req.query.municipality).toString('hex').toString()
    console.log("key: " + key);
    const fileHash = contract.get(key);
    console.log('filehash: ' + fileHash)
    res.json({"response": req.query.hash === fileHash});
});

function loadContract(web3) {
    const abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_municipality",
                    "type": "string"
                },
                {
                    "name": "_hash",
                    "type": "string"
                }
            ],
            "name": "addInput",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_municipality",
                    "type": "string"
                }
            ],
            "name": "get",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const address = fs.readFileSync('/tmp/contract-address', 'utf8');
    const contract = web3.eth.contract(abi);
    return contract.at(address);
}

module.exports = router;