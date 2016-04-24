import React, { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

class TagSelect extends Component {
  render() {
    const { onChange, possibleTags, value } = this.props
    const val = value || [] //initially passed string
    return(
      <div>
        <ReactTags
          tags={val}
          suggestions={possibleTags.map(tag => tag.id)}
          handleAddition={ newTag => {
            onChange( val.find(tagObj => tagObj.id === newTag) ? val : val.concat({id: newTag, text: newTag}) )
          }}
          handleDelete={ index => {
            onChange( val.filter((_, i) => i !== index) )
          }}
          />
      </div>
    )
  }
}

export default TagSelect
