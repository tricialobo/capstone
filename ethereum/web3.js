const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')
const provider = new HDWalletProvider(
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
  'HTTP://127.0.0.1:9545',
  0,
  10
)
const web3 = new Web3(provider)

module.exports = web3
