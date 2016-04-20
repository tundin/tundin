import React, { Component } from 'react'

import PostForm from './PostForm'



class NewPost extends Component {
  render() {
    return (
      <div className='NewPost'>
      <h2>New Post</h2>
        <PostForm />
      </div>
    )
  }
}

export default NewPost
