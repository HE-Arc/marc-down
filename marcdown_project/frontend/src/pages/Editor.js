import React, { Component } from "react";
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import '../../static/styles/code-mirror.css'

class Editor extends Component {
  render() {
    return (
      <div>
          <CodeMirror
            value={"Editing note with ID:" + this.props.match.params.id}
            options={{
              mode: 'xml',
              theme: 'material',
              lineNumbers: true,
            }}
            onChange={(editor, data, value) => {
            }}
          />
        </div>
        <div></div>
      </div>
    );
  }
}

export default Editor;