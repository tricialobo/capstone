import axios from 'axios'

//action types

const GOT_ALL_CAMPAIGNS = 'GOT_ALL_CAMPAIGNS'
const SET_ALL_USER_CAMPAIGNS = 'SET_ALL_USER_CAMPAIGNS'
const SET_SINGLE_CAMPAIGN = 'SET_SINGLE_CAMPAIGN'
const SET_CAMPAIGN = 'SET_CAMPAIGN'
const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN'
const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'
const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN'
const SET_CAMPAIGN_LOADING_STATUS = 'SET_CAMPAIGN_LOADING_STATUS'
const SET_CAMPAIGN_ERROR_STATUS = 'SET_CAMPAIGN_ERROR_STATUS'

//initial state

const initialState = {
  allCampaigns: [],
  allUserCampaigns: [],
  singleCampaign: {},
  isLoading: {},
  isError: {}
}

//action creators

export const gotAllCampaigns = campaigns => ({
  type: GOT_ALL_CAMPAIGNS,
  campaigns
})

export const setAllUserCampaigns = campaigns => ({
  type: SET_ALL_USER_CAMPAIGNS,
  campaigns
})

export const setSingleCampaign = campaign => ({
  type: SET_SINGLE_CAMPAIGN,
  campaign
})

export const setCampaign = campaign => ({
  type: SET_CAMPAIGN,
  campaign
})

export const createCampaign = campaign => ({
  type: CREATE_CAMPAIGN,
  campaign
})

export const updateCampaign = campaign => ({
  type: UPDATE_CAMPAIGN,
  campaign
})

export const deleteCampaign = campaign => {
  return {
    type: DELETE_CAMPAIGN,
    campaign
  }
}

export const setCampaignLoadingStatus = status => {
  return {
    type: SET_CAMPAIGN_LOADING_STATUS,
    status
  }
}

export const setCampaignErrorStatus = status => {
  return {
    type: SET_CAMPAIGN_ERROR_STATUS,
    status
  }
}

//thunks

export const addAd = (campId, adId) => {
  return async dispatch => {
    const { data } = await axios.put(`/api/campaigns/add/${campId}/${adId}`)
    dispatch(setCampaign(data[0]))
  }
}

export const removeAdFromCamp = (campId, adId) => {
  return async dispatch => {
    const { data } = await axios.put(`api/campaigns/remove/${campId}/${adId}`)
    dispatch(setCampaign(data[0]))
  }
}

export function getAllCampaigns() {
  return async dispatch => {
    try {
      dispatch(setCampaignLoadingStatus(true))
      const campaigns = await axios.get('/api/campaigns')
      dispatch(gotAllCampaigns(campaigns.data))
      dispatch(setCampaignLoadingStatus(false))
    } catch (error) {
      dispatch(setCampaignLoadingStatus(false))
      console.error(error)
      dispatch(setCampaignErrorStatus(true))
    }
  }
}

export const fetchAllUserCampaigns = () => {
  return async dispatch => {
    try {
      dispatch(setCampaignLoadingStatus(true))
      const { data: campaigns } = await axios.get('/api/campaigns/user')
      dispatch(setAllUserCampaigns(campaigns))
      dispatch(setCampaignLoadingStatus(false))
    } catch (error) {
      dispatch(setCampaignLoadingStatus(false))
      console.error(error)
      dispatch(setCampaignErrorStatus(true))
    }
  }
}

export const fetchSingleCampaign = campaignId => {
  return async dispatch => {
    try {
      dispatch(setCampaignLoadingStatus(true))
      const { data: campaign } = await axios.get(
        `/api/campaigns/campaign/${campaignId}`
      )
      dispatch(setSingleCampaign(campaign))
      dispatch(setCampaignLoadingStatus(false))
    } catch (error) {
      dispatch(setCampaignLoadingStatus(false))
      console.error(error)
      dispatch(setCampaignErrorStatus(true))
    }
  }
}

export const postCampaign = campaign => {
  return async dispatch => {
    try {
      const { data: newCampaign } = await axios.post('/api/campaigns', campaign)
      dispatch(createCampaign(newCampaign))
      dispatch(fetchAllUserCampaigns(newCampaign.advertiserId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const editCampaign = campaignId => {
  return async dispatch => {
    try {
      const { data: campaign } = await axios.put(
        `/api/campaigns/campaign/${campaignId}`
      )
      dispatch(updateCampaign(campaign))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeCampaign = campaignId => {
  return async dispatch => {
    try {
      const { data: campaign } = await axios.delete(
        `/api/campaigns/${campaignId}`
      )
      dispatch(deleteCampaign(campaign))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.campaigns }
    case SET_ALL_USER_CAMPAIGNS: {
      return { ...state, allUserCampaigns: action.campaigns }
    }
    case SET_SINGLE_CAMPAIGN:
      return { ...state, singleCampaign: action.campaign }
    case SET_CAMPAIGN: {
      return { ...state, singleCampaign: action.campaign }
    }
    case CREATE_CAMPAIGN:
      return {
        ...state,
        allUserCampaigns: [...state.allUserCampaigns, action.campaign]
      }
    case UPDATE_CAMPAIGN:
      return {
        state,
        singleCampaign: action.campaign,
        allUserCampaigns: state.allUserCampaigns.map(campaign => {
          if (campaign.id === action.id) {
            console.log('UPDATED!')
            campaign = action.campaign
            return campaign
          } else return campaign
        })
      }
    case DELETE_CAMPAIGN:
      return {
        ...state,
        allUserCampaigns: state.allUserCampaigns.filter(
          campaign => campaign.id !== action.campaignId
        )
      }
    case SET_CAMPAIGN_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status
      }
    case SET_CAMPAIGN_ERROR_STATUS:
      return {
        ...state,
        isError: action.status
      }
    default:
      return state
  }
}
