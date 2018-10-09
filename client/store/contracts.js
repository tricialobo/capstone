import axios from 'axios'

const GET_CONTRACT_FOR_USER = 'GET_CONTRACT_FOR_USER'
// const GET_PREVIOUS_CONTRACTS = 'GOT_PREVIOUS_CONTRACTS'

const initialState = {
  currentUserContract: {}
  // previousContracts: []
}

// export const gotPreviousContracts = contracts => ({
//   type: GET_PREVIOUS_CONTRACTS,
//   contracts
// })

const getContract = contract => {
  return {
    type: GET_CONTRACT_FOR_USER,
    contract
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
    //   case GET_PREVIOUS_CONTRACTS:
    //     return { ...state, previousContracts: action.contracts }
    case GET_CONTRACT_FOR_USER:
      console.log('action', action)
      return { ...state, currentUserContract: action.contract }

    default:
      return state
  }
}
