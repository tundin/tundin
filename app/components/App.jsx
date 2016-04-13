import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionCreators } from '../actions/auth'
import Header from './Header'
import styles from './app.css'

const { checkForToken, login } = actionCreators


class App extends Component {
  componentDidMount(){
    const { auth, checkForToken } = this.props
    if (!auth.isAuthorized){
      checkForToken()
    }
  }

  render() {
    const { children } = this.props
    return (
      <div className={styles.app}>
        <Header />
        {children}
      </div>
    )
  }
}

function mapStateToProps(state){
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps, { checkForToken, login })(App)
