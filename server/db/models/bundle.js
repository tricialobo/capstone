const Sequelize = require('sequelize')
const db = require('../db')

const Bundle = db.define('bundle', {
  projectName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  scriptTag: {
    type: Sequelize.TEXT
  },
  deployed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Bundle
