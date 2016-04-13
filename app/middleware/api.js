import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

const API_ROOT = 'http://localhost:4200/api/v0.0'

// callApi makes request to API, checks status (if != 200 dispatch failure), and normalizes response
function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  const token = localStorage.getItem('id_token') || null

  let config = {}

  if (token) {
    console.log('Making API request with token');
    config.headers = { 'Authorization': `Bearer ${token}` }
  } else {
    console.log('Making API request as guest');
  }

  // Return fetch promise
  return fetch(fullUrl, config).then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      const camelizedJson = camelizeKeys(json)

      // TODO: nextURL when paginated
      return Object.assign({},
        normalize(camelizedJson, schema))
    })
}

// NORMALIZR

const channelSchema = new Schema('channels', {
  idAttribute: 'id'
})

const postSchema = new Schema('posts', {
  idAttribute: 'id'
})

const tagSchema = new Schema('tags', {
  idAttribute: 'id'
})

channelSchema.define({
  tags: arrayOf(tagSchema)
})

postSchema.define({
  tags: arrayOf(tagSchema)
})

export const Schemas = {
  CHANNELS: arrayOf(channelSchema),
  POSTS: arrayOf(postSchema),
  POST: postSchema
}

export const CALL_API = Symbol('Call API')

// api middleware

export default store => next => action => {
  // Request info is value associated with 'Call API' symbol
  const callAPI = action[CALL_API]
  // action doesn't have CALL_API key
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  // otherwise unpack CALL_API object
    // endpoint can be string or function which takes state as argument
  let { endpoint } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('API MIDDLEWARE: endpoint URL must be string or function which returns string')
  }

  if (!schema) {
    throw new Error('API MIDDLEWARE: schema required to normalize response')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('API MIDDLEWARE: array of action types for request, success, and failure required')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('API MIDDLEWARE: action types must be strings')
  }

  // Build action to be handled by reducers/later middleware
  function actionWith(data) {
    const finalAction = {...action, ...data}
    delete finalAction[CALL_API]
    return finalAction
  }

  // Pattern match to get types from array
  const [ requestType, successType, failureType ] = types
  //DISPATCH API REQUEST ACTION
  next(actionWith({ type: requestType }))
  //CALL API
  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      error: error.message || 'Something bad happened',
      type: failureType
    }))
  )
}
