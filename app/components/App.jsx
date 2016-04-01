import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionCreators } from '../actions'
import User from './User'
import Note from './Note'

const { checkForToken, login } = actionCreators

class App extends Component {
  componentDidMount(){
    const { auth, checkForToken } = this.props
    if (!auth.isAuthorized){
      checkForToken()
    }
  }

  render() {
    const { auth, login } = this.props
    return (
      <div>
        <User isAuthenticated={auth.isAuthenticated} handleLoginClick={login} />
        <Note />
      </div>
    )
  }
}

function mapStateToProps(state){
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps, { checkForToken, login })(App)
