import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2"
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../static/styles/code-mirror.css"
import query from "../helpers.js";

import ReactMarkdown from "react-markdown"

class Editor extends Component {
  constructor(params) {
    super(params);
    this.state = {
      input: "Loading...",
      existsInDatabase: false
    };
  }

  _saveNote() {
    if (this.state.existsInDatabase) {
      console.log("UPDATING USING A PATCH");
    }
    else {
      // Create a new note
      query(`/api/note/`, "POST", {
        public: false,
        readOnly: false,
        sharedWith: [],
        content: this.state.input
      }).then((result) => {
        this.setState({ existsInDatabase: true });
      });
    }
  }

  _loadFromDatabase(id) {
    id = parseInt(id);

    if (isNaN(id)) {
      this.setState({ input: "# Could not load this note\n\nInvalid ID specified\n\nEdit this note to create a new one" });
    }
    else {
      query(`/api/note/${id}`).then((result) => {
        if (result.id === undefined) {
          this.setState({ input: "# Could not load this note\n\n**Error detail**: " + result.detail + "\n\nMake sure you have the permission to read this note\n\nEdit this note to create a new one" });
        }
        else {
          this.setState({ input: result.content, existsInDatabase: true });
          console.log(result);
        }
      }).catch((error) => {
        this.setState({ input: "# Could not load this note\n\nMake sure you are connected to the internet\n\nEdit this note to create a new one" });
      });

    }

  }

  componentDidMount() {
    if (this.props.match.params.id === "new") {
      this.setState({ input: "# Note name\n\n" });
    } else {
      this._loadFromDatabase(this.props.match.params.id);
    }
  }

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