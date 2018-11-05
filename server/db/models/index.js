const User = require('./user')
const Advertisement = require('./advertisement')
const Campaign = require('./campaign')
const Demographic = require('./demographic')
const Bundle = require('./bundle')
const Category = require('./category')
const Contract = require('./contract')
const PartiesToContract = require('./partiesToContract')
const campaignDemographic = require('./campaignDemographic')

PartiesToContract.belongsTo(Contract)
Advertisement.hasMany(Contract)
Contract.belongsTo(Advertisement)

Advertisement.belongsToMany(Campaign, { through: 'adsInCampaign' })
Campaign.belongsToMany(Advertisement, { through: 'adsInCampaign' })

Campaign.belongsToMany(Bundle, { through: 'campaignsInBundle' })
Bundle.belongsToMany(Campaign, { through: 'campaignsInBundle' })

Bundle.belongsTo(User, { as: 'developer' })
User.hasMany(Bundle)

Contract.belongsTo(Bundle)
Bundle.hasMany(Contract)

Campaign.hasMany(Contract)
Contract.belongsTo(Campaign)

Campaign.belongsTo(User, { as: 'advertiser' })
User.hasMany(Campaign)

Campaign.belongsToMany(Demographic, { through: 'campaignDemographic' })
Demographic.belongsToMany(Campaign, { through: 'campaignDemographic' })

Campaign.belongsToMany(Category, { through: 'campaignCategories' })
Category.belongsToMany(Campaign, { through: 'campaignCategories' })

Contract.belongsToMany(User, { through: 'partiesToContract' })
User.belongsToMany(Contract, { through: 'partiesToContract' })

Campaign.belongsToMany(Contract, { through: 'campaignContract' })
Contract.belongsToMany(Campaign, { through: 'campaignContract' })

module.exports = {
  User,
  Advertisement,
  Campaign,
  Bundle,
  Demographic,
  Category,
  Contract,
  PartiesToContract,
  campaignDemographic
}
