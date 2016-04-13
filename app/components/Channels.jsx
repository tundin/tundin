import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { actionCreators } from '../actions/channels'

class Channels extends Component {
  spinner() {
    return <p>Loading...</p>
  }

  linkToChannel(channel){
    return (
      <li key={channel.id}>
        <Link to={`/to/${channel.id}`}>{channel.id}</Link>
      </li>
    )
  }

  componentDidMount(){
    const { loadChannels } = this.props
    loadChannels()
  }

  render() {
    const { channels, children } = this.props
    return (
      <div>
        <h2>Select a channel...</h2>
        <ul>
          { channels ?
            channels.map(this.linkToChannel)
            : this.spinner() }
        </ul>
        {children}
      </div>
    )
  }
}

function mapStateToProps({ entities }){
  const { channels } = entities
  let channelsList = []
  if (channels){
    channelsList = Object.keys(channels).map(id => channels[id])
  }
  return { channels: channelsList }
}

const { loadChannels } = actionCreators

export default connect(mapStateToProps, {loadChannels})(Channels)
