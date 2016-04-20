import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import TagSelect from './TagSelect'

const fields = [
  'title',
  'tags'
]

class PostForm extends Component {
  render() {
    const { fields: {post, tags}, possibleTags } = this.props
    return (
      <form>
        <label>Title:</label>
        <input type="text"/>
        <h3>Tags</h3>
        <TagSelect possibleTags={possibleTags} {...tags} />
        {/*{!tags.length && tags.map((tag, index) => {
          console.log(tag);
          return (
            <div key={tag.id}>
              <p>{tag.id} : {tag.description}</p>
            </div>
          )
        })}
        <select onChange={event => {
          event.preventDefault()
          let fullTag = possibleTags.find((tag) => {
            return tag.id === event.target.value
          })
          console.log('full tag:', fullTag);
          tags.addField(fullTag)
        }} >
          {possibleTags.map((tag, i) => {
            return (<option key={i} value={tag.id}>{tag.id}: {tag.description}</option>)
          })}
        </select>*/}

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
