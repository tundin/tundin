import React, { Component } from 'react'

export default class User extends Component {
  renderLogin(){
    const { handleLoginClick } = this.props
    return <p onClick={ handleLoginClick }>Login with twitter</p>

  }

  render(){
    const { isAuthenticated, profile } = this.props
    console.log('profile:',profile);
    if (!isAuthenticated) {
      return this.renderLogin()
    } else {
      return <p>Hello {profile.name}</p>
    }
  }
}
