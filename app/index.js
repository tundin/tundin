import './main.css';

import querystring from 'querystring'

import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

import apiMiddleware from './middleware/api'
import reducers from './reducers'
import App from './components/App'
import Channels from './components/Channels'
import Channel from './components/Channel'
import Post from './components/Post'
import NewPost from './components/NewPost'

const rMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
    form: formReducer
  }),
  applyMiddleware(rMiddleware, thunkMiddleware, apiMiddleware, loggerMiddleware)
)

const history = syncHistoryWithStore(browserHistory, store)

function onEnter(nextState, replace) {
  const { location } = nextState
  if (location.hash) {
    const hash = querystring.parse(location.hash.substr(1))
    localStorage.setItem('id_token', hash.id_token)
    replace({...location, hash: ''})
  }
}

ReactDOM.render(<Provider store={store}>
  <Router history={history} >
    <Route path="/" onEnter={onEnter} component={App}>
      <Route path="to" component={Channels}>
        <Route path=":channel" component={Channel} ></Route>
        <Route path="/posts/new" component={NewPost}></Route>
        <Route path="/posts/:post" component={Post}></Route>
      </Route>
    </Route>
  </Router>
</Provider>,
document.getElementById('app'))
