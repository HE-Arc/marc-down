import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2"
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../static/styles/code-mirror.css"

import ReactMarkdown from "react-markdown"

const input = "# This is a header\n\nAnd this is a paragraph. TODO: Parse from codemirror"

class Editor extends Component {
  render() {
    return (
      <div>
        <div id="editor">
          <CodeMirror
            value={"Editing note with ID:" + this.props.match.params.id}
            options={{
              mode: "xml",
              theme: "material",
              lineNumbers: true,
            }}
            onChange={(editor, data, value) => {
            }}
          />
        </div>
        <div id="md-render">
          <ReactMarkdown source={input} />
        </div>
      </div>
    );
  }
}

export default Editor;