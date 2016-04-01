import React, { Component } from 'react'
import { connect } from 'react-redux'

export default class User extends Component {
  renderLogin(){
    const { handleLoginClick } = this.props
    return <p onClick={ handleLoginClick }>Login with twitter</p>

  }

  render(){
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      return this.renderLogin()
    } else {
      return <p>hi!</p>
    }
  }
}
