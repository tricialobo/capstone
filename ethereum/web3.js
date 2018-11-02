const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')
const provider = new HDWalletProvider(
  'punch soon over smooth convince improve stock spoon very deposit device endless',
  'HTTP://127.0.0.1:7545',
  0,
  10
)
const web3 = new Web3(provider)



module.exports = web3
