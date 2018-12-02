const Enigma = artifacts.require("./Enigma.sol");
const Web3 = require('web3');
const fs = require('fs');
const keccak256 = require('keccak256')


let web3;
if (typeof web3 === 'undefined') {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
} else {
    web3 = new Web3(web3.currentProvider);
}


module.exports = function(deployer) {
  return deployer.deploy(Enigma)
    .then(() => Enigma.deployed())
    .then(instance => {
        fs.writeFileSync('/tmp/contract-address', instance.address);
        signData(instance);
    })
}

function signData(contract) {
    fs.readdirSync('../db/budgets').forEach(filename => {
        fileContent = fs.readFileSync(`../db/budgets/${filename}`);
        // console.log(Buffer(fileContent).toString('base64'))
        fileHash = keccak256(Buffer(fileContent).toString('base64')).toString('hex');
        nameHash = keccak256(filename.split('.')[0]).toString('hex');
        // console.log(filename.split('.')[0])
        console.log('hash: ' + fileHash)
        console.log('name: ' + nameHash)
        contract.addInput(nameHash, fileHash)
    })
    // return meta.sendCoin(account_two, 10, {from: account_one});
}