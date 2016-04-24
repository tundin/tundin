import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import TagSelect from './TagSelect'
import PostBodyInput from './PostBodyInput'

const fields = [
  'title',
  'tags',
  'body'
]

class PostForm extends Component {
  render() {
    const { fields: {post, tags, body}, possibleTags } = this.props
    return (
      <form>
        <label>Title:</label>
        <input type="text"/>
        <h3>Tags</h3>
        <TagSelect possibleTags={possibleTags} {...tags} />
        <h3>Body</h3>
        <PostBodyInput {...body} />

      </form>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    entities: {
      tags
    }
  } = state
  const tagsArray = Object.keys(tags).sort().map(id => tags[id])
  return {
    post: state.postModel,
    possibleTags: tagsArray
  }}

export default reduxForm({
  form: 'post',
  fields
},
  mapStateToProps)(PostForm)
