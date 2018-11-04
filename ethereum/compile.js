const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

const fundsTransferPath = path.resolve(
  __dirname,
  'contracts',
  'fundsTransfer.sol'
)
const source = fs.readFileSync(fundsTransferPath, 'utf8')
const output = solc.compile(source, 1).contracts

fs.ensureDirSync(buildPath)
console.log('output', output)
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  )
}
