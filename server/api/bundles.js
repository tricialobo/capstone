const router = require('express').Router()
var nodemailer = require('nodemailer')
const { Bundle, User, Campaign } = require('../db/models')

router.put('/remove', async (req, res, next) => {
  console.log('bundleId & campaignId', req.body.bundleId, req.body.campaignId)
  const bundleId = req.body.bundleId
  try {
  const bundle = await Bundle.findById(bundleId)
  const updateBundle = await bundle.removeCampaign(req.body.campaignId)
  const updatedBun = await Bundle.findAll({
    where: {
      id: bundleId
    }, include: [{model: Campaign}]
  })
  res.json(updatedBun[0].campaigns)
  }catch (err) {
    next(err)
  }
})

router.put('/:bundleId', async (req, res, next) => {
  try {
    const bundleId = req.params.bundleId
    const bundle = await Bundle.findById(bundleId)
    const updateBundle = await bundle.addCampaign(req.body.campaign)
    const updatedBundle = await Bundle.findAll({
      where: {
        id: bundleId
      }
    })
    res.json(updatedBundle)
  } catch (error) {
    console.error(error)
  }
})

router.post('/newbundle/:userId', async (req, res, next) => {
  console.log('hello??')
    const userId = req.params.userId
    try{
    const newBun = await Bundle.create({
      developerId: userId,
      projectName: req.body.projectName
    })
    newBun.campaigns = []
    res.json(newBun)
  } catch (err) {
    next(err)
  }
})


router.post('/email', function create(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jstadplacement@gmail.com',
      pass: 'Hopperjst12345'
    }
  })
  var mailOptions = {
    from: 'jstadplacement@gmail.com',
    //this is a variable
    to: `${advertiserEmail}`,
    subject: 'Payment required to place your campaign',
    text: `Please send ${amountDue} to ${contractAddress}`
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
  res.send(201, req.params)
})




// get all bundles belonging to a dev user
router.get('/user/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const bundles = await Bundle.findAll({
      where: {
        developerId: userId
      }, include: [{model: Campaign}]
    })
    res.json(bundles)
  } catch (err) {
    next(err)
  }
})

// get all campaigns in a specific bundle and their advertiser email
router.get('/:bundleId', async (req, res, next) => {
  try {
    const bundle = await Bundle.findById(req.params.bundleId, {
      include: [
        { model: User, as: 'developer' },
        {
          model: Campaign,
          as: 'campaigns',
          include: [{ model: User, as: 'advertiser' }]
        }
      ]
    })
    if (!bundle) res.sendStatus(404)
    else res.json(bundle)
  } catch (err) {
    next(err)
  }
})

module.exports = router
