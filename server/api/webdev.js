const router = require('express').Router()
const { Bundle, Campaign, Advertisement } = require('../db/models')

const createScript = require('./helpers')

module.exports = router

router.get('/bundle/:bundleId/adscript', async (req, res, next) => {
  const bundleId = req.params.bundleId
  try {
    const DevTag = `
      <div>
        <h3>Paste the code below into your app:</h3>
        <pre>
          <script src="http://localhost:3000/api/scripts/${bundleId}.js" />
        </pre>
      </div>`
    res.json(DevTag)
  } catch (err) {
    next(err)
  }
})

//get all ads in a campaign -- used for bundleCheckout page
router.get('/bundle/:bundleId', async (req, res, next) => {
  const bundleId = req.params.bundleId
  try {
    let adsArr = []
    const bundle = await Bundle.findById(bundleId, {
      include: [{ model: Campaign, include: [{ model: Advertisement }] }]
    })
    await bundle.campaigns.map(campaign => {
      campaign.advertisements.map(ad => {
        adsArr.push(ad)
      })
    })
    res.json(adsArr)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const campaigns = await Campaign.findAll()
    console.log(campaigns)
    res.json(campaigns)
  } catch (err) {
    next(err)
  }
})
