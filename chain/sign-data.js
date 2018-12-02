const fs = require('fs');
const Web3 = require('web3')

console.log("sdj")
// setup web3
let web3;
if (typeof web3 === 'undefined') {
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
} else {
    return new Web3(web3.currentProvider);
}

console.log(web3)

const contract = loadContract();
signDataOnBlockchain(contract);


function loadContract() {
    const abi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_year",
                    "type": "uint256"
                },
                {
                    "name": "_municipality",
                    "type": "string"
                }
            ],
            "name": "get",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "_year",
                    "type": "uint256"
                },
                {
                    "name": "_municipality",
                    "type": "string"
                },
                {
                    "name": "_hash",
                    "type": "bytes32"
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
        }
    ];
    const address = fs.readFileSyn('/tmp/contract-address', 'utf8');
    console.log(address)
    const contract = web3.eth.contract(abi);
    return contract.at(address);
}

function signDataOnBlockchain(contract) {
    fs.readdirSync('../db/budgets').forEach(file => {
        console.log(file);
    })
}