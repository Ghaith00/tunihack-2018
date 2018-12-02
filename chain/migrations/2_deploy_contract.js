const Enigma = artifacts.require("./Enigma.sol");
const fs = require('fs');
module.exports = function(deployer) {
  return deployer.deploy(Enigma)
    .then(() => Enigma.deployed())
    .then(instance => {
        console.log("Enigma deployed at address: " + instance.address);
        fs.writeFileSync('/tmp/contract-address', instance.address);
    })
}