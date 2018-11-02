import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const ALL_USERS = 'ALL_USERS'
const SELECTED_USER = 'SELECTED_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  currentUser: {},
  allUsers: [],
  selectedUser: {}
}
/**
 * ACTION CREATORS
 */
const getUser = currentUser => ({ type: GET_USER, currentUser })
const logoutUser = () => ({ type: LOGOUT_USER })
const setAllUsers = allUsers => {
  return {
    type: ALL_USERS,
    allUsers
  }
}
const setSingleUser = selectedUser => {
  return {
    type: SELECTED_USER,
    selectedUser
  }
}
const setAfterDeleting = selectedUser => {
  return {
    type: DELETE_USER,
    selectedUser
  }
}
const setUpdatedUser = selectedUser => {
  return {
    type: UPDATE_USER,
    selectedUser
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}
export const logInUser = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', { email, password })
  } catch (authError) {
    console.log('wrong password')
    return dispatch(getUser({ error: authError }))
  }

  try {
    const user = res.data
    dispatch(getUser(user))
    console.log(user)
    user.isAdvertiser
      ? history.push('/campaigns')
      : history.push('/allcampaigns')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signUpUser = user => async dispatch => {
  let res
  console.log('is advertiser???', user.isAdvertiser)
  try {
    res = await axios.post('/auth/signup', user)
    console.log('user created in reducer', res)
  } catch (authError) {
    console.error(authError)
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    // history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(logoutUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/users')
      dispatch(setAllUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchSingleUser = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${id}`)
      dispatch(setSingleUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteUserOnServer = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`)
      dispatch(setAfterDeleting(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateUserOnServer = (id, userData) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/users/${id}`, userData)
      dispatch(setUpdatedUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  const selectedUser = action.selectedUser
  const allUsers = action.allUsers
  const currentUser = action.currentUser
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser }
    case LOGOUT_USER:
      return { ...state, currentUser: {} }
    case ALL_USERS:
      return { ...state, allUsers }
    case SELECTED_USER:
      return { ...state, selectedUser }
    case DELETE_USER:
      const newUserList = state.allUsers.filter(
        user => user.id !== action.selectedUser.id
      )
      return { ...state, allUsers: newUserList, selectedUser: null }
    case UPDATE_USER:
      return { ...state, selectedUser }
    default:
      return state
  }
}
