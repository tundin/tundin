import './main.css';

import querystring from 'querystring'

import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

import reducers from './reducers'
import App from './components/App'

const rMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(rMiddleware, thunkMiddleware, loggerMiddleware)
)

const history = syncHistoryWithStore(browserHistory, store)

function createElement(Component, props) {
  if (Component.populateStore) {
    Component.populateStore(store, props);
  }
  return <Component {...props} />
}

function onEnter(nextState, replace) {
  const { location } = nextState
  if (location.hash) {
    const hash = querystring.parse(location.hash.substr(1))
    localStorage.setItem('id_token', hash.id_token)
    replace({...location, hash: ''})
  }
}

ReactDOM.render(<Provider store={store}>
  <Router history={history} createElement={createElement}>
    <Route path="/" onEnter={onEnter} component={App}></Route>
  </Router>
</Provider>,
document.getElementById('app'))
