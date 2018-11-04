const router = require('express').Router()

const { Bundle, Campaign, Advertisement, Contract } = require('../db/models')

router.get('/:bundleId.js', async (req, res, next) => {
  try {
    let ads = []

    const contracts = await Contract.findAll({
      where: {
        bundleId: req.params.bundleId
      },
      include: [
        {
          model: Bundle,
          include: [{ model: Campaign, include: { model: Advertisement } }]
        }
      ]
    })

    await contracts.forEach(contract => {
      contract.bundle.campaigns.map(campaign => {
        campaign.advertisements.map(ad => ads.push([ad, contract.contractHash]))
      })
    })

    const currentAd = ads[Math.floor(Math.random() * ads.length)]
    const blockHash = currentAd[1]

    res.send(
      `let targetEl = document.querySelector('#adtarget')
    const adImg = document.createElement('img');
    adImg.setAttribute('src', "${currentAd[0].image}");
    adImg.addEventListener('click', (evt) => {
      var request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:8080/api/contracts/${blockHash}', true )

      request.send()
    window.location.href= "${currentAd[0].url}"
    });
    targetEl.appendChild(adImg)`
    )
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
