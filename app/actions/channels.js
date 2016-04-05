import { CALL_API, Schemas } from '../middleware/api'

// CHANNELS

// actionTypes

const FETCH_CHANNELS_REQUEST = 'FETCH_CHANNELS_REQUEST'
const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS'
const FETCH_CHANNELS_FAILURE = 'FETCH_CHANNELS_FAILURE'

// actionCreator

function fetchChannels() {
  return {
    [CALL_API]: {
      types: [
        FETCH_CHANNELS_REQUEST,
        FETCH_CHANNELS_SUCCESS,
        FETCH_CHANNELS_FAILURE
      ],
      endpoint: '/channels',
      schema: Schemas.CHANNELS
    }
  }
}

function loadChannels(){
  return (dispatch, getState) => {

    return dispatch(fetchChannels())
  }
}

export const actionCreators = {
  loadChannels
}
