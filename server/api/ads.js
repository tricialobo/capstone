const router = require('express').Router()
const { Advertisement, Campaign } = require('../db/models')
module.exports = router

// get all ads
router.get('/', async (req, res, next) => {
  try {
    const ads = await Advertisement.findAll({
      where: {
        advertiserId: req.session.passport.user
      }
    })
    console.log(ads)
    res.json(ads)
  } catch (err) {
    next(err)
  }
})

// get all ads belonging to a user
router.get('/user/:userId', async (req, res, next) => {
  try {
    const ads = await Advertisement.findAll({
      where: {
        advertiserId: req.params.userId
      },
      include: [{ model: Campaign }]
    })
    res.json(ads)
  } catch (err) {
    next(err)
  }
})

// get a specific ad
router.get('/:adId', async (req, res, next) => {
  try {
    const ad = await Advertisement.findById(req.params.adId)
    if (!ad) res.sendStatus(404)
    else res.send(ad)
  } catch (err) {
    next(err)
  }
})

// create a new ad
router.post('/', (req, res, next) => {
  Advertisement.create(req.body)
    .then(ad => {
      res.json(ad)
    })
    .catch(next)
})

router.put('/ad/:adId', (req, res, next) => {
  Advertisement.findById(req.params.adId)
    .then(ad => {
      if (ad) {
        ad.update(req.body).then(updatedAd => {
          res.json(updatedAd)
        })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(next)
})

router.delete('/:adId', (req, res, next) => {
  Advertisement.findById(req.params.adId)
    .then(ad => {
      if (ad) {
        ad.destroy({ force: true }).then(deletedAd => res.json(deletedAd))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(next)
})
