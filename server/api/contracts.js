const router = require('express').Router()
const {
  Contract,
  User,
  Campaign,
  PartiesToContract,
  Bundle
} = require('../db/models')
const { getUser, sendEmail } = require('./helpers')
const factory = require('../../ethereum/factory')
const fundsTransfer = require('../../ethereum/fundsTransfer')
const web3 = require('../../ethereum/web3')
const axios = require('axios')
const DeveloperEmail = require('./emails/DeveloperEmail')
module.exports = router

router.get('/:contractHash', async (req, res, next) => {
  try {
    const contract = await Contract.findOne({
      where: {
        contractHash: req.params.contractHash
      },
      include: [
        {
          model: User,
          through: 'partiesToContracts',
          where: {
            isAdvertiser: true
          }
        },
        { model: Bundle }
      ]
    })
    res.json(contract)
  } catch (error) {
    console.error(error)
  }
})

router.get('/:userid/user', async (req, res, next) => {
  try {
    const userId = req.params.userid
    const contracts = await PartiesToContract.findAll({
      where: {
        userId: userId
      },
      include: [{ model: Contract, where: { status: 'TRUE', paid: 'FALSE' } }]
    })
    res.send(contracts)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const contracts = await Contract.findAll({
      include: [{ model: User, through: 'partiesToContract' }]
    })
    const blocks = await getDeployedBlocks()
    res.json(blocks)
  } catch (err) {
    next(err)
  }
})

router.get('/:contractId', async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.contractId)
    if (!contract) res.sendStatus(404)
    else res.send(contract)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userid', async (req, res, next) => {
  try {
    const contracts = await PartiesToContract.findAll({
      where: {
        userId: req.params.userid
      },
      include: [{ model: Contract, include: { model: Campaign } }]
    })
    res.json(contracts)
  } catch (err) {
    next(err)
  }
})
router.post('/:contractHash', async (req, res, next) => {
  try {
    let contractHash = req.params.contractHash
    let contract = await Contract.findOne({
      where: {
        contractHash: contractHash
      },
      include: [
        {
          model: User,
          through: 'partiesToContract'
        }
      ]
    })
    const contractUsers = contract.users

    const advertiserId = contract.users.filter(user => user.isAdvertiser)
    const developerId = contract.users.filter(user => !user.isAdvertiser)
    let accounts = await web3.eth.getAccounts(console.log)
    const blocks = await factory.methods.getDeployedBlocks().call()
    const indexOf = blocks.indexOf(contractHash)
    const currentContract = fundsTransfer(blocks[indexOf])
    currentContract.options.address = `${contractHash}`

    const webdevAddress = developerId[0].webdevBlockAddress
    const balance = await currentContract.methods.getBalance().call()
    await currentContract.methods
      .withdraw(accounts[1], accounts[4])
      .send({
        gas: 5000000,
        from: accounts[0]
      })
      .then(response => console.log(response))

    sendEmail(developerId[0].firstName, developerId[0].email, {
      from: 'Grace',
      to: developerId[0].email,
      subject: 'Grace has sent a payment to your Etherium wallet',
      html: DeveloperEmail(
        developerId[0].firstName,
        contractHash,
        balance * 0.75
      )
    })
  } catch (error) {
    console.error(error)
  }
})

router.put('/paid', async (req, res, next) => {
  try {
    const contractHash = req.body.contractHash
    const contract = await Contract.findOne({
      where: {
        contractHash: contractHash
      }
    })
    contract.update({ paid: true })
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { campaignId, bundleId, contractHash, balance } = req.body
    console.log('req.body', req.body)
    const newContract = await Contract.create({
      contractHash: contractHash,
      balance: balance,

      bundleId: bundleId,
      campaignId: campaignId
    })

    newContract.addUsers([req.body.devId, req.body.advertiserId])

    const advertiser = await User.findById(req.body.advertiserId)

    const updatedBalance = advertiser.balance - newContract.balance
    if (updatedBalance < newContract.balance) {
      sendEmail(advertiser.firstName, advertiser.email, {
        from: advertiser.firstName,
        to: advertiser.email,
        subject: 'Congratulations!',
        text: `Invitation to renew your campaign...`
      })

      advertiser.update({ balance: updatedBalance })
      await advertiser.save()
    }
    res.json(newContract)
  } catch (err) {
    next(err)
  }
})
