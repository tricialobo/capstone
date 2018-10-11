const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0x45b0C3E6B30F1B45f62B0148772095289e1afcAb'
)
module.exports = instance
