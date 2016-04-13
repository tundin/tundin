import qs from 'qs'

import { CALL_API, Schemas } from '../middleware/api'

// POST

// actionTypes

const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST'
const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'

// actionCreator

function fetchPost(id) {
  return {
    [CALL_API]: {
      types: [
        FETCH_POST_REQUEST,
        FETCH_POST_SUCCESS,
        FETCH_POST_FAILURE
      ],
      endpoint: `/posts/${id}`,
      schema: Schemas.POST
    }
  }
}


function loadPost(id){
  return (dispatch) => {

    return dispatch(fetchPost(id))
  }
}
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
  return (dispatch) => {

    return dispatch(fetchPosts(tags))
  }
}

export const actionCreators = {
  loadPost,
  loadPosts
}
