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

/**
 * INITIAL STATE
 */
const initialState = {
  advertisements: [],
  campaignsInBundle: [],
  allBundles: [],
  bundle: {}
}

/**
 * ACTION CREATORS
 */

export const gotAdvertisements = advertisements => ({
  type: GOT_ADVERTISEMENTS,
  advertisements
})
export const addedToBundle = campaign => ({ type: ADDED_TO_BUNDLE, campaign })
export const gotCampaignsInBundle = campaigns => ({
  type: GOT_CAMPAIGNS_IN_BUNDLE,
  campaigns
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

/**
 * THUNK CREATORS
 */

export function addToBundle(campaign, bundleid) {
  return async dispatch => {
    const bundleUpdated = await axios.put(`/api/bundles/${bundleid}`, {
      campaign: campaign.id
    })
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

export function addBundle (obj) {
  console.log('in addbundle func')
  return async dispatch => {
    console.log('in async dispatch in addbundle func')
    const {data} = await axios.post(`/api/bundles/newbundle/${obj.userId}`, obj)
    console.log('newBun', data)
    dispatch(addedBundle(data))
  }
} 

export default function(state = initialState, action) {
  switch (action.type) {
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
      return {...state, allBundles: [...state.allBundles, action.bundle]}
    default:
      return state
  }
}
