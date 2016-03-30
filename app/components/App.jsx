import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionCreators } from '../actions'
import Note from './Note'

const { checkForToken } = actionCreators

class App extends Component {
  componentDidMount(){
    const { auth, checkForToken } = this.props
    if (!auth.isAuthorized){
      checkForToken()
    }
  }

  render() {
    return <Note />
  }
}

function mapStateToProps(state){
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps, { checkForToken })(App)
