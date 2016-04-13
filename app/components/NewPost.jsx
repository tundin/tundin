import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

class PostForm extends Component {
  render() {
    const { fields: { title, body }, handleSubmit } = this.props
    return (
      <form onSubmit={ handleSubmit }>
      <div>
        <label>Title:</label>
        <input type="text" placeholder="title" {...title}/>
      </div>
      <div>
        <label>Body:</label>
        <textarea {...body} value={body.value || ''}></textarea>
      </div>
      <button type="submit">Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'post',
  fields: ['title', 'body']
})(PostForm)
