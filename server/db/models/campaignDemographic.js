const Sequelize = require('sequelize')
const db = require('../db')

const campaignDemographic = db.define('campaignDemographic', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = campaignDemographic
