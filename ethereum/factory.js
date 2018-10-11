const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0xD2C91E0F7932ed59cEf629bCB15b6bC5ED51C14b'
)
module.exports = instance
