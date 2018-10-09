const User = require('./user')
const Advertisement = require('./advertisement')
const Campaign = require('./campaign')
const Demographic = require('./demographic')
const Bundle = require('./bundle')
const Category = require('./category')
const Contract = require('./contract')
const PartiesToContract = require('./partiesToContract')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 //  */

// Advertisement.belongsTo(User)
// // User.hasMany(Advertisement)

PartiesToContract.belongsTo(Contract)
Advertisement.belongsToMany(Contract, { through: 'adsInContract' })
Contract.belongsToMany(Advertisement, { through: 'adsInContract' })
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
  PartiesToContract
}
