import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { IndexLink } from 'react-router'

import { actionCreators } from '../actions/auth'
import User from './User'

import logo from '../../static/tundin.png'
import MenuIcon from '../../static/menu.svg'
import styles from './header.css'


class Header extends Component {
  render() {
    const { auth, login } = this.props
    console.log(auth);
    return (
      <div className={styles.header}>
      <MenuIcon className={styles.menuIcon} />
        <ul>
          <li className={styles.li}>
            <IndexLink to="/" className={styles.navItem}>Home</IndexLink>
          </li>
          <li className={styles.li}>
            <IndexLink to="/to" className={styles.navItem}>Channels</IndexLink>
          </li>
        </ul>
        <img src={logo} className={styles.logo} alt="logo"/>
        <User isAuthenticated={auth.isAuthenticated} handleLoginClick={login} profile={auth.profile} />
    </div>)
  }
}

function mapStateToProps(state){
  const { auth } = state
  return { auth }
}

const { login } = actionCreators

export default connect(mapStateToProps, { login })(Header)
