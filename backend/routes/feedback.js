const express = require('express');
const router = express.Router();
var path = require('path');
const fs = require('fs');
const Web3 = require('web3');
const keccak256 = require('keccak256')


// /feedback?cin=...&municipality=...&desc=...

let web3;
if (typeof web3 === 'undefined') {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
} else {
    web3 = new Web3(web3.currentProvider);
}

router.get('/', function(req, res, next) {

    const cin = req.query.cin;
    const municipality = req.query.municipality;
    const desc = req.query.desc;

    web3.eth.defaultAccount = web3.eth.accounts[0];
    const contract = loadContract(web3);
    let key = keccak256(municipality).toString('hex').toString()
    console.log(key)
    contract.addFeedback(key, cin, desc);
    res.json({"response": true})
});

function loadContract(web3) {
    const abi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_municipality",
                    "type": "string"
                },
                {
                    "name": "_cin",
                    "type": "string"
                }
            ],
            "name": "getFeedback",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
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
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_municipality",
                    "type": "string"
                },
                {
                    "name": "_cin",
                    "type": "string"
                },
                {
                    "name": "_desc",
                    "type": "string"
                }
            ],
            "name": "addFeedback",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const address = fs.readFileSync('/tmp/contract-address', 'utf8');
    const contract = web3.eth.contract(abi);
    return contract.at(address);
}

module.exports = router;