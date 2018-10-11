const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0xc0ED63E3A70BfCB003452B1Cc083db822e1f23e1'
)
module.exports = instance
