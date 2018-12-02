module.exports = {

  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

  authors: [
    "Zied Guesmi <guesmy.zied@gmail.com>"
  ],
  license: "GPLv2",
  networks: {
    dev: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};