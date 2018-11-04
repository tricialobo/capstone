const fundsTransfer = require('./build/fundsTransfer.json')
const web3 = require('./web3')

module.exports = address => {
  return new web3.eth.Contract(JSON.parse(fundsTransfer.interface), address)
}

