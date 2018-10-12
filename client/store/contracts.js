import axios from 'axios'

const FETCH_USER_BY_CONTRACT = 'FETCH_USER_BY_CONTRACT'
const GET_CONTRACT_FOR_USER = 'GET_CONTRACT_FOR_USER'
const GET_CONTRACT_INFO = 'GET_CONTRACT_INFO'
const GET_PREVIOUS_CONTRACTS = 'GOT_PREVIOUS_CONTRACTS'

const initialState = {
  currentUserContract: {},
  currentUser: {},
  previousContracts: [],
  contract: {}
}

const gotContractInfo = contract => ({
  type: GET_CONTRACT_INFO,
  contract
})
const gotPreviousContracts = contracts => ({
  type: GET_PREVIOUS_CONTRACTS,
  contracts
})

const getUserByContract = user => {
  return {
    type: FETCH_USER_BY_CONTRACT,
    user
  }
}
const getContract = contract => {
  return {
    type: GET_CONTRACT_FOR_USER,
    contract
  }
}

export function getContractInfo(contractHash) {
  console.log('hello out there, in getcontractinfo')
  return async dispatch => {
    const contract = await axios.get(`/api/contracts/${contractHash}`)
    const action = gotContractInfo(contract)
    dispatch(action)
  }
}
export function fetchUserByContract(contractHash) {
  return async dispatch => {
    const user = await axios.get(`/api/contracts/user/${contractHash}`)
    const action = getUserByContract(user)
    dispatch(action)
  }
}

export function getPreviousContracts(userid) {
  return async dispatch => {
    const previousContracts = await axios.get(`/api/contracts/closed/${userid}`)
    const action = gotPreviousContracts(previousContracts)
    dispatch(action)
  }
}

export const fetchContract = userId => {
  return async dispatch => {
    try {
      const contractuser = await axios.get(`/api/contracts/${userId}/user`)
      console.log('contract', contractuser.data)
      dispatch(getContract(contractuser.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTRACT_INFO:
      return { ...state, contract: action.contract }
    case FETCH_USER_BY_CONTRACT:
      return { ...state, currentUser: action.user }
    case GET_CONTRACT_FOR_USER:
      console.log('action', action)
      return { ...state, currentUserContract: action.contract }

    default:
      return state
  }
}
