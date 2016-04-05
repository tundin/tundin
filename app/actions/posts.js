import qs from 'qs'

import { CALL_API, Schemas } from '../middleware/api'

// POSTS

// actionTypes

const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

// actionCreator

function fetchPosts(tags) {
  return {
    [CALL_API]: {
      types: [
        FETCH_POSTS_REQUEST,
        FETCH_POSTS_SUCCESS,
        FETCH_POSTS_FAILURE
      ],
      endpoint: tags ? `/posts?${qs.stringify({ tags })}` : '/posts',
      schema: Schemas.POSTS
    }
  }
}

function loadPosts(tags){
  return (dispatch, getState) => {

    return dispatch(fetchPosts(tags))
  }
}

export const actionCreators = {
  loadPosts
}
