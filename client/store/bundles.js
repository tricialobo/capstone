import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_ADVERTISEMENTS = 'GOT_ADVERTISEMENTS'
const ADDED_TO_BUNDLE = 'ADD_TO_BUNDLE'
const GOT_CAMPAIGNS_IN_BUNDLE = 'GOT_CAMPAIGNS_IN_BUNDLE'
const GOT_ALL_BUNDLES = 'GOT_ALL_BUNDLES'
const SET_BUNDLE = 'SET_BUNDLE'
const REMOVED_CAMPAIGN_FROM_BUNDLE = 'REMOVED_CAMPAIGN_FROM_BUNDLE'
const ADDED_BUNDLE = 'ADDED_BUNDLE'
const OPEN_ADD_NEW = 'OPEN_ADD_NEW'
const DEPLOYED_BUNDLE = 'DEPLOYED_BUNDLE'
const GOT_PREVIOUS_BUNDLES = 'GOT_PREVIOUS_BUNDLES'

/**
 * INITIAL STATE
 */
const initialState = {
  advertisements: [],
  campaignsInBundle: [],
  allBundles: [],
  bundle: {},
  addNewBool: false,
  previousBundles: []
}

/**
 * ACTION CREATORS
 */

export const gotPreviousBundles = bundles => ({
  type: GOT_PREVIOUS_BUNDLES,
  bundles
})
export const gotAdvertisements = advertisements => ({
  type: GOT_ADVERTISEMENTS,
  advertisements
})
export const addedToBundle = campaign => ({ type: ADDED_TO_BUNDLE, campaign })
export const gotCampaignsInBundle = campaigns => ({
  type: GOT_CAMPAIGNS_IN_BUNDLE,
  campaigns
})

export const addNew = () => ({
  type: OPEN_ADD_NEW
})

export const gotAllBundles = bundles => ({
  type: GOT_ALL_BUNDLES,
  bundles
})

export const setBundle = bundle => ({
  type: SET_BUNDLE,
  bundle
})

export const addedBundle = bundle => ({
  type: ADDED_BUNDLE,
  bundle
})

export const deployedBundle = bundle => ({
  type: DEPLOYED_BUNDLE,
  bundle
})

/**
 * THUNK CREATORS
 */

export function getPreviousBundles(userid) {
  return async dispatch => {
    const previousBundles = await axios.get(`/api/bundles/previous/${userid}`)
    const action = gotPreviousBundles(previousBundles)
    dispatch(action)
  }
}
export function addToBundle(campaign, bundleid) {
  return async dispatch => {
    const bundleUpdated = await axios.put(
      `/api/bundles/addcampaign/${bundleid}`,
      {
        campaign: campaign.id
      }
    )
    console.log('bundleupdated', bundleUpdated)
    const action = addedToBundle(campaign)
    dispatch(action)
  }
}

export function getCampaignsInBundle(id) {
  return async dispatch => {
    const bundle = await axios.get(`/api/bundles/${id}`)
    console.log('campaigns', bundle.data.campaigns)
    dispatch(gotCampaignsInBundle(bundle.data.campaigns))
  }
}

export function getAdvertisements(id) {
  return async dispatch => {
    const advertisements = await axios.get(`/api/dev/bundle/${id}`)
    dispatch(gotAdvertisements(advertisements.data))
  }
}

export function getAllBundles(userId) {
  return async dispatch => {
    const bundles = await axios.get(`/api/bundles/user/${userId}`)
    dispatch(gotAllBundles(bundles.data))
  }
}

export function removeCampaignFromBundle(info) {
  return async dispatch => {
    const { data } = await axios.put('/api/bundles/remove', info)
    dispatch(gotCampaignsInBundle(data))
  }
}

export function addBundle(obj) {
  console.log('in addbundle func')
  return async dispatch => {
    console.log('in async dispatch in addbundle func')
    const { data } = await axios.post(
      `/api/bundles/newbundle/${obj.userId}`,
      obj
    )
    console.log('newBun', data)
    dispatch(addedBundle(data))
  }
}

export function updateBundle(bundleId) {
  return async dispatch => {
    console.log('IN THUNK!', bundleId)
    const bundle = await axios.put(`/api/bundles/deploy/${bundleId}`)
    console.log('this is bundle', bundle)
    dispatch(deployedBundle(bundle.data))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PREVIOUS_BUNDLES: {
      return {
        ...state,
        previousBundles: action.bundles
      }
    }
    case ADDED_TO_BUNDLE: {
      return {
        ...state,
        campaignsInBundle: [...state.campaignsInBundle, action.campaign]
      }
    }
    case GOT_ADVERTISEMENTS:
      return { ...state, advertisements: action.advertisements }
    case GOT_CAMPAIGNS_IN_BUNDLE:
      return { ...state, campaignsInBundle: action.campaigns }
    case GOT_ALL_BUNDLES:
      return { ...state, allBundles: action.bundles }
    case SET_BUNDLE:
      return { ...state, bundle: action.bundle }
    case ADDED_BUNDLE:
      return { ...state, allBundles: [...state.allBundles, action.bundle] }
    case OPEN_ADD_NEW:
      return { ...state, addNewBool: !state.addNewBool }
    case DEPLOYED_BUNDLE:
      return { ...state, bundle: action.bundle }
    default:
      return state
  }
}
