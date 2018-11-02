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
//const { getDeployedBlocks } = require('../../client/components/controller')
const fundsTransfer = require('../../ethereum/fundsTransfer')
const web3 = require('../../ethereum/web3')
const axios = require('axios')
const DeveloperEmail = require('./emails/DeveloperEmail')
module.exports = router

<<<<<<< HEAD
router.get('/closed/:userid', async (req, res, next) => {
=======
router.get('/:contractHash', async (req, res, next) => {
>>>>>>> 053db265a86cf7343d8f52177330be64295da6db
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

<<<<<<< HEAD
=======
//for getting previous contracts for dev view

// router.get('/closed/:userid', async (req, res, next) => {
//   try {
//     const contracts = await PartiesToContract.findAll({
//       where: {
//         userId: req.params.userid
//       },
//       include: [
//         {
//           model: Contract,
//           where: { status: 'FALSE', paid: 'TRUE' },
//           include: [{ model: Bundle, include: { model: Campaign } }]
//         }
//       ]
//     })
//     res.json(contracts)
//   } catch (error) {
//     console.error(error)
//   }
// })
//get open contracts by user id; for payment portal
>>>>>>> 053db265a86cf7343d8f52177330be64295da6db
router.get('/:userid/user', async (req, res, next) => {
  try {
    const userId = req.params.userid
    console.log('userid', userId)
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

<<<<<<< HEAD
router.get('/', async (req, res, next) => {
  try {
    const contracts = await Contract.findAll({
      include: [{ model: User, through: 'partiesToContract' }]
    })
    const blocks = await getDeployedBlocks()
    console.log('blocks', blocks)
    res.json(blocks)
  } catch (err) {
    next(err)
  }
})
=======
// router.get('/', async (req, res, next) => {
//   try {
//     const contracts = await Contract.findAll({
//       include: [{ model: User, through: 'partiesToContract' }]
//     })
//     // comment this back in eventually res.json(contracts)
//     const blocks = await getDeployedBlocks()
//     console.log('blocks', blocks)
//     res.json(contracts)
//   } catch (err) {
//     next(err)
//   }
// })
>>>>>>> 053db265a86cf7343d8f52177330be64295da6db

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
<<<<<<< HEAD
=======
    console.log('contract id', req.params.contractHash)
    //get webdev etherium address here, as well as contract
>>>>>>> 053db265a86cf7343d8f52177330be64295da6db
    let contractHash = req.params.contractHash
    console.log('contractHash', contractHash)
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
<<<<<<< HEAD
    console.log('advertiser id', advertiserId[0].id)
    console.log('contract users', contractUsers)
    if (contract.clickCount === 10 || contract.clickCount > 10) {
      let accounts = await web3.eth.getAccounts(console.log)
      const blocks = await factory.methods.getDeployedBlocks().call()
      console.log('blocks', blocks)
      const indexOf = blocks.indexOf(contractHash)
      const currentContract = fundsTransfer(blocks[indexOf]) //for methods
      currentContract.options.address = `${contractHash}`
      const webdevAddress = developerId[0].webdevBlockAddress
      const withdraw = await currentContract.methods
        .withdraw(webdevAddress, accounts[4])
        .send({
          gas: 3000000,
          from: accounts[0]
        })
      const createBlock = await factory.methods.createBlock().send({
        gas: 500000,
        from: accounts[4]
=======
    console.log('developerId', developerId)
    //console.log('developerId', developerId[0].webdevBlockAddress)
    // console.log('advertiser id', advertiserId[0].id)
    //console.log('contract users', contractUsers)
    // if (contract.clickCount === 0) {
    console.log('in if block')
    //withdraw funds from contract
    let accounts = await web3.eth.getAccounts(console.log)
    const blocks = await factory.methods.getDeployedBlocks().call()
    console.log('blocks', blocks)
    const indexOf = blocks.indexOf(contractHash)
    const currentContract = fundsTransfer(blocks[indexOf])
    console.log('current contract', currentContract)
    //for methods
    // console.log('currentContract', currentContract)
    currentContract.options.address = `${contractHash}`

    const webdevAddress = developerId[0].webdevBlockAddress
    const balance = await currentContract.methods.getBalance().call()
    console.log('webdev', webdevAddress)
    console.log('hello! right before withdraw!')
    console.log('current', await currentContract.methods.getBalance().call())
    await currentContract.methods
      .withdraw(accounts[1], accounts[4])
      .send({
        gas: 5000000,
        from: accounts[0]
>>>>>>> 053db265a86cf7343d8f52177330be64295da6db
      })
      .then(response => console.log(response))

<<<<<<< HEAD
      const createContract = () => {
        axios({
          method: 'POST',
          url: 'http://localhost:8080/api/contracts',
          data: {
            campaignId: contract.campaignId,
            bundleId: contract.bundleId,
            contractHash: blocks[blocks.length - 1],
            balance: contract.balance,
            advertiserId: advertiserId[0].id,
            devId: developerId[0].id
          }
        }).then(response => {
        })
      }
      createContract()

    } else {
      contract.increment('clickCount', { by: 1 })
    }
=======
    console.log('hello! afterwithdraw!')
    console.log('dev', developerId[0].email)

    sendEmail(developerId[0].firstName, developerId[0].email, {
      from: 'Grace',
      to: 'tricia.lobo@gmail.com',
      //to: developerId.email,
      subject: 'Grace has sent a payment to your Etherium wallet',
      html: DeveloperEmail(
        developerId[0].firstName,
        contractHash,
        balance * 0.75
      )
    })
    // const createBlock = await factory.methods.createBlock().send({
    //   gas: 500000,
    //   from: accounts[4]
    // })

    // const createContract = () => {
    //   axios({
    //     method: 'POST',
    //     url: 'http://localhost:8080/api/contracts',
    //     data: {
    //       campaignId: contract.campaignId,
    //       bundleId: contract.bundleId,
    //       contractHash: blocks[blocks.length - 1],
    //       balance: contract.balance,
    //       advertiserId: advertiserId[0].id,
    //       devId: developerId[0].id
    //     }
    //   }).then(response => {
    //     // console.log('response', response)
    //   })
    // }
    // createContract()

    //hook up to other contract route?
    //make new contract here
    // } else {
    //   contract.increment('clickCount', { by: 1 })
    // }
>>>>>>> 053db265a86cf7343d8f52177330be64295da6db
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
<<<<<<< HEAD
    console.log('advertiser', advertiser.budget)

    if (newContract.balance > advertiser.budget) {
      advertiser.update({ isActive: false })
    } else {
      const updatedBudget = advertiser.budget - newContract.balance
      if (updatedBudget < newContract.balance) {
        sendEmail(advertiser.firstName, advertiser.email, {
          from: advertiser.firstName,
          to: advertiser.email,
          subject: 'Congratulations!',
          text: `Invitation to renew your campaign...`
        })
      }
      advertiser.update({ budget: updatedBudget })
=======
    console.log('advertiser', advertiser.balance)

    // if (newContract.balance > advertiser.budget) {
    //   advertiser.update({ isActive: false })
    // } else {
    // update budget
    const updatedBalance = advertiser.balance - newContract.balance
    if (updatedBalance < newContract.balance) {
      sendEmail(advertiser.firstName, advertiser.email, {
        from: advertiser.firstName,
        to: advertiser.email,
        subject: 'Congratulations!',
        text: `Invitation to renew your campaign...`
      })
      //send email to advertiser
      //}
      advertiser.update({ balance: updatedBalance })
      await advertiser.save()
>>>>>>> 053db265a86cf7343d8f52177330be64295da6db
    }
    res.json(newContract)
  } catch (err) {
    next(err)
  }
})
