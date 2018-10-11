const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0xb34565301E3faa897f1BA031E3A2bBF1951BEAc0'
)
module.exports = instance
