const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0x7AD385B3e3f706f79dce7243cC82dDCd96C1b527'
)
module.exports = instance
