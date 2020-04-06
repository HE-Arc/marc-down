import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2"
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../static/styles/code-mirror.css"

import ReactMarkdown from "react-markdown"

class Editor extends Component {
  constructor(params) {
    super(params);
    this.state = {
      input: "Loading...",
      existsInDatabase: false
    };
  }


class Editor extends Component {
  render() {
    return (
      <div>
        <div id="editor">
          <CodeMirror
            value={this.state.input}
            options={{
              mode: "md",
              theme: "material",
              lineNumbers: true,
            }}
            onChange={(editor, data, value) => {
              this.setState({ input: value });
            }}
          />
        </div>
        <div id="md-render">
          <ReactMarkdown source={this.state.input} />
        </div>
      </div>
    );
  }
}

export default Editor;