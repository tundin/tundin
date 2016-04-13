import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { actionCreators } from '../actions/posts'

class Channel extends Component {
  spinner() {
    return <p>Loading...</p>
  }

  linkToPost(post) {
    return (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    )
  }

  componentDidMount() {
    const { loadPosts, tags } = this.props
    if (tags) {
      loadPosts(tags)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('Will receiving props: ', nextProps);
    const { loadPosts, tags } = this.props
    const nextTags = nextProps.tags
    console.log(tags && nextTags.some(tag => tags.indexOf(tag) === -1));
    if (tags && nextTags.some(tag => tags.indexOf(tag) === -1)){
      loadPosts(nextTags)
    } else if (!tags && nextTags) {
      loadPosts(nextTags)
    }

  }

  render() {
    const { params, posts } = this.props
    return (
      <div>
      <h3>{params.channel}</h3>
      <ul>
        { posts ?
          posts.map(this.linkToPost)
          : this.spinner() }
      </ul>
      </div>
    )
  }
}

function mapStateToProps({ entities }, {params}){
  const channel = entities.channels[params.channel]
  let tags, posts
  if (channel) {
    tags = channel.tags
    posts = Object.keys(entities.posts)
      .map(id => entities.posts[id])
      .filter(post => post.tags.some(tag => tags.indexOf(tag) !== -1 ))
  }
  console.log('posts', posts);
  return {
    tags,
    posts
  }
}

const { loadPosts } = actionCreators

export default connect(mapStateToProps, { loadPosts })(Channel)
