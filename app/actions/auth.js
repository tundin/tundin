// AUTH

import Auth0 from 'auth0-js'

const auth0 = new Auth0({
  domain:         'jsm.auth0.com',
  clientID:       'nmkgcfijx8LiICEIhfUL2Q12UcEIEFHx',
  callbackURL:    'http://localhost:8080', //This needs to be dynamically set
  callbackOnLocationHash: true
})

// actionTypes

const LOGIN = 'LOGIN'
const CHECK_ID_REQUEST = 'CHECK_ID_REQUEST'
const CHECK_ID_SUCCESS = 'CHECK_ID_SUCCESS'
const CHECK_ID_FAILURE = 'CHECK_ID_FAILURE'

// actionCreators

function checkIdRequest(){
  return {
    type: CHECK_ID
  }
}

function checkIdSuccess(profile){
  return {
    type: CHECK_ID_SUCCESS,
    profile
  }
}

function checkIdFailure(err){
  return {
    type: CHECK_ID_FAILURE,
    err
  }
}

// THUNKS

function login(){
  return (dispatch) => {
    auth0.login({ connection: 'twitter' })
  }
}

function checkId(token){
  return (dispatch) => {
    auth0.getProfile(token, function(err, profile){
      if (err) return dispatch(checkIdFailure(err))
      if (profile) return dispatch(checkIdSuccess(profile))
    })
  }
}

function checkForToken(){
  return (dispatch) => {
    if (localStorage.getItem('id_token')){
      dispatch(checkId(localStorage.getItem('id_token')))
    }
  }
}

export const actionTypes = {
  CHECK_ID_REQUEST,
  CHECK_ID_SUCCESS,
  CHECK_ID_FAILURE
}

export const actionCreators = {
  login,
  checkForToken,
  checkId,
  checkIdSuccess,
  checkIdFailure
}
