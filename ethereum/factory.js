//import web3 from './web3'

//import BlockFactory from './build/BlockFactory.json'
const web3 = require('./web3')
const BlockFactory = require('./build/BlockFactory.json')

const instance = new web3.eth.Contract(
  JSON.parse(BlockFactory.interface),
  '0x34F43D51437EE56a9C2b450Df930960E19427f0d'
)
module.exports = instance
//export default instance
