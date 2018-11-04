const router = require('express').Router()
const {
  Campaign,
  Advertisement,
  Demographic,
  User,
  campaignDemographic
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const campaigns = await Campaign.findAll({
      include: [{ all: true }]
    })
    res.json(campaigns)
  } catch (err) {
    next(err)
  }
})

router.get('/campaign/:campaignId', async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.campaignId, {
      include: [{ model: Advertisement }, { model: Demographic }]
    })
    if (!campaign) res.sendStatus(404)
    else res.send(campaign)
  } catch (err) {
    next(err)
  }
})

// get all campaigns belonging to a user
router.get('/user', async (req, res, next) => {
  try {
    const campaigns = await Campaign.findAll({
      where: {
        advertiserId: req.session.passport.user
      },
      include: [{ model: Advertisement }, { model: Demographic }]
    })
    res.json(campaigns)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { demographics } = req.body
    const campaign = await Campaign.create(req.body)
    // demographics.forEach(async demographic => {
    //   console.log('ids', campaign.id, demographic.id)
    //   await campaignDemographic.create({
    //     campaignId: campaign.id,
    //     demographicId: demographic.id
    //   })
    // })
    demographics.forEach(demographic => campaign.addDemographic(demographic.id))
    res.json(campaign)
  } catch (err) {
    next(err)
  }
})

router.put('/campaign/:campaignId', (req, res, next) => {
  const { demographics } = req.body
  Campaign.findById(req.params.campaignId, {
    include: [{ model: Advertisement }, { model: Demographic }]
  })
    .then(campaign => {
      if (campaign) {
        campaign.update(req.body).then(updatedCampaign => {
          return res.json(updatedCampaign)
        })
      } else {
        const err = new Error('Campaign not found.')
        err.status = 404
        next(err)
      }
    })
    .catch(next)
})

router.put('/add/:campaignId/:adId', async (req, res, next) => {
  const campaignId = req.params.campaignId
  const adId = req.params.adId
  try {
    const campaign = await Campaign.findById(campaignId)
    await campaign.addAdvertisement(adId)
    await campaign.save()
    const updatedCampaign = await Campaign.findAll({
      where: {
        id: campaignId
      },
      include: [{ model: Advertisement }]
    })
    res.json(updatedCampaign)
  } catch (err) {
    next(err)
  }
})

router.put('/remove/:campaignId/:adId', async (req, res, next) => {
  const campaignId = req.params.campaignId
  const adId = req.params.adId
  try {
    const campaign = await Campaign.findById(campaignId)
    await campaign.removeAdvertisement(adId)
    await campaign.save()
    const updatedCampaign = await Campaign.findAll({
      where: {
        id: campaignId
      },
      include: [{ model: Advertisement }]
    })
    res.json(updatedCampaign)
  } catch (err) {
    next(err)
  }
})

router.delete('/:campaignId', (req, res, next) => {
  Campaign.findById(req.params.campaignId)
    .then(campaign => {
      if (campaign) {
        campaign
          .destroy({ force: true })
          .then(deletedCampaign => res.json(deletedCampaign))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(next)
})
