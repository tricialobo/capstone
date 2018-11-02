const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/BlockFactory.json')

const provider = new HDWalletProvider(
  'punch soon over smooth convince improve stock spoon very deposit device endless',
  'HTTP://127.0.0.1:7545',
  1,
  10
)

const web3 = new Web3(provider)
const deploy = async () => {
  const accounts = await web3.eth.getAccounts(console.log)
  console.log('accounts', accounts)
  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
}
deploy()
