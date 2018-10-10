const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0x4D2D24899c0B115a1fce8637FCa610Fe02f1909e'
)
module.exports = instance
