const router = require('express').Router()
const { User } = require('../db/models')

module.exports = router

router.get('/payment/:blockHash', async (req, res, next) => {
  try {
    const allContracts = await factory.methods.getDeployedBlocks().call()
  } catch (error) {
    console.error(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'isAdvertiser']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } })
    res.json(req.params.id)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { budget } = req.body

    let updateUser = await User.findById(req.params.id)
    if (budget > updateUser.budget) {
      const diff = updateUser.budget - updateUser.balance
      const newBalance = budget - diff
      await updateUser.update({ balance: newBalance })
    }

    await updateUser.update(req.body)

    res.json(updateUser)
  } catch (err) {
    next(err)
  }
})
