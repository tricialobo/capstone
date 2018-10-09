const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/BlockFactory.json')

const provider = new HDWalletProvider(
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
  'HTTP://127.0.0.1:9545',
  1,
  10
  // 'https://ropsten.infura.io/v3/02427097878a4f188252300ea34a1be9'
)

//const web3 = new Web3(new Web3(provider))
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
