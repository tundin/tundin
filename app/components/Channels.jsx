import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { actionCreators } from '../actions/channels'

class Channels extends Component {
  static populateStore(store, props) {
    const { dispatch, getState } = store
    actionCreators.loadChannels()(dispatch, getState)
  }
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

  render() {
    const { channels } = this.props
    console.log(channels);
    return (
      <div>
        <h2>Select a channel...</h2>
        <ul>
          { channels ?
            channels.map(this.linkToChannel)
            : this.spinner() }
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ auth, entities, routing }){
  const { channels } = entities
  let channelsList = []
  if (channels){
    channelsList = Object.keys(channels).map(id => channels[id])
  }
  return { channels: channelsList }
}

const { loadChannels } = actionCreators

export default connect(mapStateToProps, {loadChannels})(Channels)
