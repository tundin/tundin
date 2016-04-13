import { actionTypes } from '../actions/auth'

function entities(state = {channels: {}, tags: {}, posts: {}}, action) {
  if (action.response && action.response.entities) {
    console.log('normalized api response entities:', action.response.entities);
    return Object.assign({}, state, action.response.entities) // This will overwrite/entity rather than merge
  } else {
    return state
  }
}


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
  auth,
  entities
}
