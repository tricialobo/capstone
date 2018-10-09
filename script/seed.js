'use strict'

const db = require('../server/db')
const {
  User,
  Bundle,
  Category,
  Demographic,
  Campaign,
  Advertisement,
  Contract
} = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Bill',
      lastName: 'Gates',
      email: 'rolex@email.com',
      password: '123',
      budget: 44.0,
      isAdvertiser: true
    }),
    User.create({
      firstName: 'Grace',
      lastName: 'Hopper',
      email: 'dev1@email.com',
      password: '123',
      isAdvertiser: false,
      webdevBlockAddress: '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
    })
  ])

  const user1 = await User.create({
    firstName: 'Jan',
    lastName: 'Chen',
    email: 'dev2@email.com',
    password: '1234',
    isAdvertiser: false,
    webdevBlockAddress: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
    salt: 'salt'
  })

  const user2 = await User.create({
    firstName: 'Tricia',
    lastName: 'Lobo',
    email: 'dev3@email.com',
    password: '1234',
    isAdvertiser: false,
    webdevBlockAddress: '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544',

    salt: 'salt'
  })

  const user3 = await User.create({
    firstName: 'Stacy',
    lastName: 'Harfenist',
    email: 'gucci@email.com',
    password: '1234',
    isAdvertiser: true,
    budget: 50.0,
    salt: 'salt'
  })

  const user4 = await User.create({
    firstName: 'Jesus',
    lastName: 'Christ',
    email: 'mcdonalds@email.com',
    password: '1234',
    isAdvertiser: true,
    budget: 60.0,
    salt: 'salt'
  })

  // const contract1 = await Contract.create({
  //   contractHash: '0x94d52535fe072e44c0745c114d816ff066fcee9e',
  //   balance: 15.0,
  //   status: true,
  //   clickCount: 500
  // })
  // await contract1.addUser(user1)

  // const contract2 = await Contract.create({
  //   contractHash: '0x94d52535fe072e44c0745c114d816ff066fcee9e',
  //   balance: 10.0,
  //   status: true,
  //   clickCount: 500
  // })
  // await contract2.addUser(user1)

  // const contract3 = await Contract.create({
  //   contractHash: '0x94d52535fe072e44c0745c114d816ff066fcee9e',
  //   balance: 18.0,
  //   status: true,
  //   clickCount: 500
  // })
  // await contract3.addUser(user2)

  // const contract4 = await Contract.create({
  //   contractHash: '0x94d52535fe072e44c0745c114d816ff066fcee9e',
  //   balance: 20.0,
  //   status: true,
  //   clickCount: 500
  // })
  // await contract4.addUser(user3)

  const bundle1 = await Bundle.create({
    projectName: 'Project1A',
    developerId: 4
  })

  const bundle2 = await Bundle.create({
    projectName: 'Project2A',
    developerId: 2
  })

  const bundle3 = await Bundle.create({
    projectName: 'Project3A',
    developerId: 3
  })

  const bundles = await Promise.all([
    Bundle.create({
      projectName: 'Project1B',
      developerId: 4
    }),
    Bundle.create({
      projectName: 'Project2B',
      developerId: 2
    }),
    Bundle.create({
      projectName: 'Project3B',
      developerId: 3
    }),
    Bundle.create({
      projectName: 'Project3C',
      developerId: 3
    }),
    Bundle.create({
      projectName: 'Project2C',
      developerId: 2
    }),
    Bundle.create({
      projectName: 'Project1C',
      developerId: 4
    }),
    Bundle.create({
      projectName: 'Project2D',
      developerId: 2
    })
  ])

  const category1 = await Category.create({
    name: 'Luxury'
  })

  const category2 = await Category.create({
    name: 'Fashion'
  })

  const category3 = await Category.create({
    name: 'Sports'
  })

  const categories = await Promise.all([
    Category.create({
      name: 'Insurance'
    }),
    Category.create({
      name: 'Pharmaceuticals'
    }),
    Category.create({
      name: 'Lifestyle'
    }),
    Category.create({
      name: 'Vacation'
    }),
    Category.create({
      name: 'Beauty & Skincare'
    }),
    Category.create({
      name: 'Electronics'
    }),
    Category.create({
      name: 'Software & Mobile Applications'
    }),
    Category.create({
      name: 'Food'
    }),
    Category.create({
      name: 'Fitness'
    })
  ])

  const demographics = await Promise.all([
    Demographic.create({
      name: 'Ages 18-30'
    }),
    Demographic.create({
      name: 'Income $50,000-$75,000'
    }),
    Demographic.create({
      name: 'Income $100,000+'
    }),
    Demographic.create({
      name: 'College students'
    }),
    Demographic.create({
      name: 'Ages 65+'
    })
  ])

  const demographic1 = await Demographic.create({
    name: 'Women'
  })

  const demographic2 = await Demographic.create({
    name: 'Men'
  })

  const demographic3 = await Demographic.create({
    name: 'Kids'
  })

  const campaign1 = await Campaign.create({
    blockChainKey: 'abc',
    clicks: 8,
    name: 'Rolex',
    price: '9000.0',
    isActive: true,
    advertiserId: 1
  })
  await campaign1.addBundle(bundle1)
  await campaign1.addBundle(bundle2)
  await campaign1.addCategory(category2)
  await campaign1.addCategory(category3)
  await campaign1.addDemographic(demographic3)
  await campaign1.addDemographic(demographic2)
  // await campaign1.addContract(contract1)

  const campaign2 = await Campaign.create({
    blockChainKey: '',
    clicks: 3,
    name: 'Gucci',
    price: '8000.0',
    isActive: true,
    advertiserId: 5
  })
  await campaign2.addBundle(bundle3)
  await campaign2.addBundle(bundle1)
  await campaign2.addCategory(category1)
  await campaign2.addCategory(category2)
  await campaign2.addDemographic(demographic1)
  await campaign2.addDemographic(demographic3)
  // await campaign2.addContract(contract1)

  const campaign3 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'Mcdonalds',
    price: '1000.0',
    isActive: true,
    advertiserId: 6
  })
  await campaign3.addCategory(category3)
  await campaign3.addCategory(category2)
  await campaign3.addDemographic(demographic1)
  await campaign3.addDemographic(demographic3)
  // await campaign3.addContract(contract2)

  const ad1 = await Advertisement.create({
    name: 'Rolex-Ad-1',
    image:
      'https://i.pinimg.com/originals/3d/1c/71/3d1c7119f809873fe15d75da8151c770.jpg',
    url: 'http://google.com',
    adSpecs: 'format1',
    advertiserId: 1
  })
  await ad1.addCampaign(campaign1)

  const ad2 = await Advertisement.create({
    name: 'Rolex-Ad-2',
    image:
      'https://happinessequalsoutlook.files.wordpress.com/2013/03/david-beckham.png',
    url: 'http://google.com',
    adSpecs: 'format2',
    advertiserId: 1
  })
  await ad2.addCampaign(campaign1)

  const ad3 = await Advertisement.create({
    name: 'Rolex-Ad-3',
    image:
      'https://static1.squarespace.com/static/55e0902de4b0903e2fc9145d/5893b87417bffcb23ca6ecb3/5893b8aacd0f68ddeaf31004/1486117597714/Rolex+Ads.jpg',
    url: 'http://google.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad3.addCampaign(campaign1)

  const ad4 = await Advertisement.create({
    name: 'Gucci-Ad-1',
    image: 'http://www.leblogluxe.com/files/2014/11/1200.jpg',
    url: 'http://google.com',
    adSpecs: 'format3',
    advertiserId: 5
  })
  await ad4.addCampaign(campaign2)

  const ad5 = await Advertisement.create({
    name: 'Gucci-Ad-2',
    image:
      'http://cdn2-www.thefashionspot.com/assets/uploads/2014/07/ad-campaign-gucci-fall-2014-mert-and-marcus-article-two.jpg',
    url: 'http://google.com',
    adSpecs: 'format3',
    advertiserId: 5
  })
  await ad5.addCampaign(campaign2)

  const ad6 = await Advertisement.create({
    name: 'Mcdonalds-Ad-1',
    image: 'http://www.adruby.com/files/image-ads/McDonald-3543-1.jpg',
    url: 'http://google.com',
    adSpecs: 'format3',
    advertiserId: 6
  })
  await ad6.addCampaign(campaign3)

  const ad7 = await Advertisement.create({
    name: 'Mcdonalds-Ad-2',
    image:
      'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/42533407_10155863687227014_8105177112362614784_o.jpg?_nc_cat=100&oh=3fef04c3b2bbd169c4a05c9544becdf8&oe=5C6250B0',
    url: 'http://google.com',
    adSpecs: 'format3',
    advertiserId: 6
  })
  await ad7.addCampaign(campaign3)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
