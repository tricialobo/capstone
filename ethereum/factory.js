const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0x4415A98a7195C3b1a0dF40659a40fb1C4B902766'
)
module.exports = instance
