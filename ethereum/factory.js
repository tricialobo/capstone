const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0xC8Ef23DB3BB7817A6eaB1F709761ed796eA0AaF2'
)
module.exports = instance
