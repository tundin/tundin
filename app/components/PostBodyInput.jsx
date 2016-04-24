import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

class PostBodyInput extends Component {
  constructor(props){
    super(props)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }
  handleKeyCommand(command){ // any chane this fires before render?
    console.log("key command", command);
    const { onChange, value } = this.props
    const newState = RichUtils.handleKeyCommand(value, command);
    if (newState) {
      onChange(newState)
      return true
    }
    return false
  }
  render() {
    const { value, onChange } = this.props
    const val = value || EditorState.createEmpty() // initial value empty string
    return(
      <Editor handleKeyCommand={this.handleKeyCommand} editorState={val} onChange={(editorState) => onChange(editorState)}/>
    )
  }
}

export default PostBodyInput
