import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionCreators } from '../actions/posts'

class Post extends Component {
  spinner() {
    return <p>Loading...</p>
  }

  componentDidMount() {
    const { loadPost, post, params } = this.props
    if (!post) {
      console.log('no post!');
      loadPost(params.post)
    }
  }

  render() {
    const { post } = this.props
    if (!post) return this.spinner()

    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    )
  }
}

function mapStateToProps({ entities }, { params }){
  const post = entities.posts[params.post]

  return {
    post
  }
}

const { loadPost } = actionCreators

export default connect(mapStateToProps, { loadPost })(Post)
