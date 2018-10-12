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
      email: 'uniqlo@email.com',
      password: '123',
      budget: 100.0,
      balance: 100.0,
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
    email: 'ck@email.com',
    password: '1234',
    isAdvertiser: true,
    budget: 80.0,
    balance: 80.0,
    salt: 'salt'
  })

  const user4 = await User.create({
    firstName: 'Jesus',
    lastName: 'Christ',
    email: 'mcdonalds@email.com',
    password: '1234',
    isAdvertiser: true,
    budget: 110.0,
    balance: 110.0,
    salt: 'salt'
  })

  const user5 = await User.create({
    firstName: 'Jesus',
    lastName: 'Christ',
    email: 'muji@email.com',
    password: '1234',
    isAdvertiser: true,
    budget: 110.0,
    balance: 110.0,
    salt: 'salt'
  })

  const bundle1 = await Bundle.create({
    projectName: 'Project1A',
    developerId: 4
  })

  const bundle2 = await Bundle.create({
    projectName: 'Petal',
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
      projectName: '66Royale',
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
      projectName: 'Infinity',
      developerId: 2
    }),
    Bundle.create({
      projectName: 'Project1C',
      developerId: 4
    }),
    Bundle.create({
      projectName: 'MILK',
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
    name: 'UQ_Mens FW18',
    price: '20.0',
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
    name: '#mycalvins S19',
    price: '18.0',
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
    name: "Mcdonald's",
    price: '10.0',
    isActive: true,
    advertiserId: 6
  })
  await campaign3.addCategory(category3)
  await campaign3.addCategory(category2)
  await campaign3.addDemographic(demographic1)
  await campaign3.addDemographic(demographic3)
  // await campaign3.addContract(contract2)

  const campaign4 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'MUJI HOME F18',
    price: '20.0',
    isActive: true,
    advertiserId: 7
  })
  await campaign4.addCategory(category1)
  await campaign4.addCategory(category2)
  await campaign4.addDemographic(demographic1)
  await campaign4.addDemographic(demographic3)

  const campaign5 = await Campaign.create({
    blockChainKey: 'abc',
    clicks: 8,
    name: 'UQ_Womens FW18',
    price: '20.0',
    isActive: true,
    advertiserId: 1
  })
  await campaign5.addBundle(bundle1)
  await campaign5.addBundle(bundle3)
  await campaign5.addCategory(category2)
  await campaign5.addCategory(category3)
  await campaign5.addDemographic(demographic1)
  await campaign5.addDemographic(demographic2)

  const campaign6 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'Mcdonalds',
    price: '10.0',
    isActive: true,
    advertiserId: 6
  })
  await campaign6.addCategory(category3)
  await campaign6.addCategory(category2)
  await campaign6.addDemographic(demographic1)
  await campaign6.addDemographic(demographic3)

  const campaign7 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: '#mycalvins F18',
    price: '70.0',
    isActive: true,
    advertiserId: 5
  })
  await campaign7.addCategory(category3)
  await campaign7.addCategory(category2)
  await campaign7.addDemographic(demographic1)
  await campaign7.addDemographic(demographic3)

  const campaign8 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'Calvin Klein SS19',
    price: '100.0',
    isActive: true,
    advertiserId: 5
  })
  await campaign8.addCategory(category3)
  await campaign8.addCategory(category2)
  await campaign8.addDemographic(demographic1)
  await campaign8.addDemographic(demographic3)

  const campaign9 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'F18 CK 205W39NYC',
    price: '10.0',
    isActive: true,
    advertiserId: 5
  })
  await campaign9.addCategory(category3)
  await campaign9.addCategory(category2)
  await campaign9.addDemographic(demographic1)
  await campaign9.addDemographic(demographic3)

  const campaign10 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'CK x Pendleton',
    price: '10.0',
    isActive: true,
    advertiserId: 5
  })
  await campaign10.addCategory(category3)
  await campaign10.addCategory(category2)
  await campaign10.addDemographic(demographic2)
  await campaign10.addDemographic(demographic3)

  const campaign11 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'UQ U',
    price: '10.0',
    isActive: true,
    advertiserId: 1
  })
  await campaign11.addCategory(category3)
  await campaign11.addCategory(category2)
  await campaign11.addDemographic(demographic2)
  await campaign11.addDemographic(demographic3)

  const campaign12 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'UQ x LEMAIRE',
    price: '15.0',
    isActive: true,
    advertiserId: 1
  })
  await campaign12.addCategory(category3)
  await campaign12.addCategory(category2)
  await campaign12.addDemographic(demographic2)
  await campaign12.addDemographic(demographic3)

  const campaign13 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'UQ x JWANDERSON',
    price: '12.0',
    isActive: true,
    advertiserId: 1
  })
  await campaign13.addCategory(category3)
  await campaign13.addCategory(category2)
  await campaign13.addDemographic(demographic2)
  await campaign13.addDemographic(demographic3)

  const campaign14 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'MUJI SKINCARE',
    price: '17.0',
    isActive: true,
    advertiserId: 7
  })
  await campaign14.addCategory(category3)
  await campaign14.addCategory(category2)
  await campaign14.addDemographic(demographic2)
  await campaign14.addDemographic(demographic3)

  const campaign15 = await Campaign.create({
    blockChainKey: '',
    clicks: 6,
    name: 'MUJI CLOTHING F18',
    price: '11.0',
    isActive: true,
    advertiserId: 7
  })
  await campaign15.addCategory(category3)
  await campaign15.addCategory(category2)
  await campaign15.addDemographic(demographic2)
  await campaign15.addDemographic(demographic3)

  const ad1 = await Advertisement.create({
    name: 'stretch-jeans-mn',
    image:
      'https://www.thefashionisto.com/wp-content/uploads/2014/08/UNIQLO-Stretch-Jeans.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format1',
    advertiserId: 1
  })
  await ad1.addCampaign(campaign1)

  const ad2 = await Advertisement.create({
    name: 'womens-fw18-preview-1',
    image: 'https://cdn.shopmined.com/content/wBjlc92-m.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format2',
    advertiserId: 1
  })
  await ad2.addCampaign(campaign5)

  const ad3 = await Advertisement.create({
    name: 'mns-fw18-preview-2',
    image:
      'https://www.uniqlo.com/us/en/news/topics/2018091301/img/mimg_1_m.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad3.addCampaign(campaign1)

  const ad4 = await Advertisement.create({
    name: 'mns-fw18-preview-1',
    image:
      'http://www.uniqlo.com/UniqloU18fw/common/images/topImg-thumb-men2.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad4.addCampaign(campaign1)

  const ad17 = await Advertisement.create({
    name: 'wmns-fw18-preview-2',
    image:
      'https://pausemag.co.uk/wp-content/uploads/2018/08/uniqlo-christophe-lemaire-fall-201813.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad17.addCampaign(campaign5)

  const ad21 = await Advertisement.create({
    name: 'wmns-fw18-preview-3',
    image:
      'https://pixel.nymag.com/imgs/fashion/daily/2015/08/26/26-lemaire-uniqlo-market-opener-2.w1200.h630.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad21.addCampaign(campaign5)

  const ad22 = await Advertisement.create({
    name: 'wmns-ULdown-1',
    image:
      'https://sg.everydayonsales.com/wp-content/uploads/2017/04/UNIQLO-Ultra-Light-Down-Jackets-and-Parkas-Promotion.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad22.addCampaign(campaign5)

  const ad23 = await Advertisement.create({
    name: 'wmns-fleece-zip',
    image: 'https://im.uniqlo.com/style/180927_women_006.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad23.addCampaign(campaign5)

  const ad24 = await Advertisement.create({
    name: 'wmns-heattech-sale',
    image:
      'https://pixel.nymag.com/imgs/daily/strategist/2017/10/12/12-uniqlo-lede.w710.h473.2x.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad24.addCampaign(campaign5)

  const ad25 = await Advertisement.create({
    name: 'wmns-3d-knit',
    image:
      'http://im.uniqlo.com/images/common/pc/goods/412838/item/10_412838_large.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad25.addCampaign(campaign5)

  const ad26 = await Advertisement.create({
    name: 'uq-u-wm-1',
    image: 'http://www.uniqlo.com/sg/news/topics/2018020901/img/mimg_1_m.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad26.addCampaign(campaign11)

  const ad27 = await Advertisement.create({
    name: 'uq-u-wm-2',
    image:
      'https://juice.com.sg/wp-content/uploads/2018/01/lookBook-item-25-945x1300.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad27.addCampaign(campaign11)

  const ad28 = await Advertisement.create({
    name: 'uq-u-grid',
    image:
      'https://i.pinimg.com/originals/18/91/ef/1891efc29dcc92d46378d87a3196023f.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad28.addCampaign(campaign11)

  const ad29 = await Advertisement.create({
    name: 'uq-u-ss18-1',
    image: 'https://i1.wp.com/duggal.com/wp-content/uploads/2018/02/2.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad29.addCampaign(campaign11)

  const ad18 = await Advertisement.create({
    name: 'uq-u-ss18-2',
    image:
      'https://images.summitmedia-digital.com/esquiremagph/images/2018/01/10/Uniqlo%20U%20SS18.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad18.addCampaign(campaign11)

  const ad19 = await Advertisement.create({
    name: 'uq-u-1',
    image:
      'https://static1.squarespace.com/static/59a21819bebafbe040f6ad2a/59a25d28ccc5c5e77deed571/5a698c97ec212d357d834f22/1517557787833/1+-+pQw9pVh.jpg?format=1500w',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad19.addCampaign(campaign11)

  const ad20 = await Advertisement.create({
    name: 'uq-u-fw18',
    image: 'https://i.ytimg.com/vi/d8fCuWodJ1g/maxresdefault.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad20.addCampaign(campaign11)

  const ad5 = await Advertisement.create({
    name: 'easy-care-shirt',
    image:
      'https://1.bp.blogspot.com/-Wex3htABsWo/WcvRtZFRQWI/AAAAAAAAFDQ/1NkAwuGO1hAZU8frBSeAkVVox1l4OH_sACLcBGAs/s1600/092517_tailored_shirts_lp_01.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format3',
    advertiserId: 1
  })
  await ad5.addCampaign(campaign1)

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

  const ad8 = await Advertisement.create({
    name: 'mns-fw18-preview-3',
    image:
      'https://www.uniqlo.com/us/en/news/topics/2018091301/img/1330T_180907e40h0E.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format1',
    advertiserId: 1
  })
  await ad8.addCampaign(campaign1)

  const ad9 = await Advertisement.create({
    name: 'mns-blocktech',
    image:
      'http://theinspirationroom.com/daily/interactive/2011/10/uniqlo_one_man.jpg',
    url: 'http://uniqlo.com',
    adSpecs: 'format1',
    advertiserId: 1
  })
  await ad9.addCampaign(campaign1)

  const ad10 = await Advertisement.create({
    name: 'mns-fw18-preview-4',
    image:
      'http://daman.co.id/daman.co.id/wp-content/uploads/2016/08/Uniqlo-U-Mens-Campaign-2-3.jpg?x38403',
    url: 'http://google.com',
    adSpecs: 'format1',
    advertiserId: 1
  })
  await ad10.addCampaign(campaign1)

  const ad11 = await Advertisement.create({
    name: 'ss19-my-calvins-1',
    image:
      'http://dazedimg.dazedgroup.netdna-cdn.com/786/azure/dazed-prod/1150/9/1159034.jpg',
    url: 'https://www.calvinklein.us/en/mycalvins',
    adSpecs: 'format3',
    advertiserId: 5
  })
  await ad11.addCampaign(campaign2)

  const ad12 = await Advertisement.create({
    name: 'ss19-my-calvins-2',
    image:
      'https://i.pinimg.com/originals/72/f4/73/72f473081dec3b37b222feefa19f9912.jpg',
    url: 'https://www.calvinklein.us/en/mycalvins',
    adSpecs: 'format3',
    advertiserId: 5
  })
  await ad12.addCampaign(campaign2)

  const ad13 = await Advertisement.create({
    name: 'ss19-my-calvins-3',
    image:
      'https://akns-images.eonline.com/eol_images/Entire_Site/2016411/rs_634x888-160511063548-634.kendall-jenner-calvin-klein.51116.jpg?fit=inside|900:auto&output-quality=90',
    url: 'https://www.calvinklein.us/en/mycalvins',
    adSpecs: 'format3',
    advertiserId: 5
  })
  await ad13.addCampaign(campaign2)

  const ad30 = await Advertisement.create({
    name: 'ss19-my-calvins-4',
    image: 'https://pbs.twimg.com/media/CZ7L1OVWcAAauPK.jpg',
    url: 'https://www.calvinklein.us/en/mycalvins',
    adSpecs: 'format3',
    advertiserId: 5
  })
  await ad30.addCampaign(campaign2)

  const ad31 = await Advertisement.create({
    name: 'ss19-my-calvins-5',
    image:
      'https://i2.wp.com/campaignsoftheworld.com/wp-content/uploads/2016/03/calvin-klein-spring-2016-mycalvins-24.jpg?resize=700%2C980&ssl=1',
    url: 'https://www.calvinklein.us/en/mycalvins',
    adSpecs: 'format3',
    advertiserId: 5
  })
  await ad31.addCampaign(campaign2)

  const ad32 = await Advertisement.create({
    name: 'ss19-my-calvins-6',
    image:
      'https://media.gq.com/photos/577d1b095e51460c396637b8/master/w_800/calvin-klein-fall-2016-campaign-young-thug_ph_tyrone-lebon-034.jpg',
    url: 'https://www.calvinklein.us/en/mycalvins',
    adSpecs: 'format3',
    advertiserId: 5
  })
  await ad32.addCampaign(campaign2)

  const ad33 = await Advertisement.create({
    name: 'muji-home18-1',
    image:
      'https://cdn.gearpatrol.com/wp-content/uploads/2018/06/Muji-M2W-Gear-Patrol-Ambaince-2.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad33.addCampaign(campaign4)

  const ad34 = await Advertisement.create({
    name: 'muji-home18-2',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/1ee3d932217887.567403db8e222.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad34.addCampaign(campaign4)

  const ad41 = await Advertisement.create({
    name: 'muji-wmn-f18',
    image: 'http://www.muji.com/hk-en/campaign/flannel2017/img/main.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad41.addCampaign(campaign15)

  const ad42 = await Advertisement.create({
    name: 'muji-home18-3',
    image:
      'http://www.muji.us/store/pub/media/wysiwyg/cleaning/17aw_hakkentohinto_1456_1.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad42.addCampaign(campaign4)

  const ad43 = await Advertisement.create({
    name: 'muji-home18-4',
    image:
      'https://www.everydayonsales.com/wp-content/uploads/2018/01/Muji-Bedlinen-and-Pillow-Promotion.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad43.addCampaign(campaign4)

  const ad44 = await Advertisement.create({
    name: 'muji-home18-5',
    image: 'https://i.vimeocdn.com/video/611075219.jpg?mw=1800&mh=1014&q=70',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad44.addCampaign(campaign4)

  const ad45 = await Advertisement.create({
    name: 'muji-SALE',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/s3.loopme.my/img/newos/posts/2x/5374_51gvoozHbQQ3HxSP_1.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad45.addCampaign(campaign15)

  const ad35 = await Advertisement.create({
    name: 'skincare-2',
    image: 'https://i.ytimg.com/vi/7D4g5fccfIk/maxresdefault.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad35.addCampaign(campaign14)

  const ad36 = await Advertisement.create({
    name: 'skincare-3',
    image: 'https://www.muji.com/img/skincare/sensitive.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad36.addCampaign(campaign14)

  const ad37 = await Advertisement.create({
    name: 'skincare-4',
    image:
      'https://cdn.vox-cdn.com/thumbor/7YehGzPj8AlUMBG8Rq5Vn2LuwgY=/0x0:720x405/1200x800/filters:focal(303x146:417x260)/cdn.vox-cdn.com/uploads/chorus_image/image/56860245/muji_skincare.0.png',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad37.addCampaign(campaign14)

  const ad38 = await Advertisement.create({
    name: 'balancing-skincare-line',
    image:
      'http://tamirajarrel.com/wp-content/uploads/2017/05/FullSizeRender-50-1.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad38.addCampaign(campaign14)

  const ad39 = await Advertisement.create({
    name: 'skincare-cover',
    image:
      'http://info.muji.us/info/wp-content/uploads/2017/03/SKINCARE-CATALOG-Cover.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad39.addCampaign(campaign14)

  const ad40 = await Advertisement.create({
    name: 'skincare-banner',
    image:
      'https://media.cleo.com.sg/2017/03/SC0417_Banner_MujiGiveaway_FA-768x500.jpg',
    url: 'https://muji.com',
    adSpecs: 'format3',
    advertiserId: 7
  })
  await ad40.addCampaign(campaign14)

  const ad14 = await Advertisement.create({
    name: 'Mcdonalds-Ad-3',
    image:
      'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/42533407_10155863687227014_8105177112362614784_o.jpg?_nc_cat=100&oh=3fef04c3b2bbd169c4a05c9544becdf8&oe=5C6250B0',
    url: 'http://google.com',
    adSpecs: 'format3',
    advertiserId: 6
  })
  await ad14.addCampaign(campaign3)

  const ad15 = await Advertisement.create({
    name: 'Mcdonalds-Ad-4',
    image:
      'https://static.adweek.com/adweek.com-prod/wp-content/uploads/files/blogs/big-mac-canada-hed-2017.jpg',
    url: 'http://google.com',
    adSpecs: 'format3',
    advertiserId: 6
  })
  await ad15.addCampaign(campaign3)

  const ad16 = await Advertisement.create({
    name: 'Mcdonalds-Ad-5',
    image:
      'http://www.adeevee.com/aimages/201609/15/mcdonalds-medal-karate-ring-rowing-bicycle-basketball-fencing-javelin-diving-torch-print-388326-adeevee.jpg',
    url: 'http://google.com',
    adSpecs: 'format3',
    advertiserId: 6
  })
  await ad16.addCampaign(campaign3)

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
