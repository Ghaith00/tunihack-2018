const Enigma = artifacts.require("./Enigma.sol");
const web3 = require('web3');
const fs = require('fs');
const keccak256 = require('keccak256')
 

module.exports = function(deployer) {
  return deployer.deploy(Enigma)
    .then(() => Enigma.deployed())
    .then(instance => {
        fs.writeFileSync('/tmp/contract-address', instance.address);
        signData(instance)
    })

    console.log(web3)
}

function signData(contract) {
    fs.readdirSync('../db/budgets').forEach(filename => {
        console.log('filename: ' + filename)
        console.log('hash: ' + keccak256(filename).toString('hex'))
        const res = contract.addInput(2018, filename, keccak256(filename).toString('hex'));
    })
    // return meta.sendCoin(account_two, 10, {from: account_one});
}