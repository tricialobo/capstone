const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')
const provider = new HDWalletProvider(
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
  'HTTP://127.0.0.1:9545',
  0,
  10
)
const web3 = new Web3(provider)
//export default web3
module.exports = web3

// let web3
// let provider
// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   // We are in the browser and metamask is running.
//   provider = new HDWalletProvider(
//     'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
//     'HTTP://127.0.0.1:9545',
//     0,
//     10
//   )
//   web3 = new Web3(provider)
// } else {
//   web3 = new Web3(
//     new Web3.providers.HttpProvider(
//       'https://ropsten.infura.io/v3/3bdc11c99cd1473ba95404db5be3208a'
//     )
//   )
// }
module.exports = web3
