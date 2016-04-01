import { actionTypes, test } from '../actions'


function auth(state = {
  isAuthenticated: false, pending: false
}, action) {
  switch(action.type) {
    case (actionTypes.CHECK_ID_REQUEST):
      return { ...state, pending: true }
    case (actionTypes.CHECK_ID_SUCCESS):
      return {
        ...state,
        isAuthenticated: true,
        pending: false,
        profile: action.profile
      }
    case (actionTypes.CHECK_ID_FAILURE):
      return {
        ...state,
        isAuthenticated: false,
        pending: false,
        error: action.err
      }
    default:
      return state
  }
}

export default {
  auth
}
