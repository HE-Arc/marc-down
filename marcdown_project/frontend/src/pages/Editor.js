import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2"
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../static/styles/code-mirror.css"
import query from "../helpers.js";
import ReactMarkdown from "react-markdown"
import DiffMatchPatch from 'diff-match-patch';

const dmp = new DiffMatchPatch();



class Editor extends Component {
  constructor(params) {
    super(params);
    this.state = {
      input: "Loading...",
      existsInDatabase: false,
      previousSavedText: "",
      noteId: -1
    };
  }

  _saveNote() {
    if (this.state.existsInDatabase) {
      const patchText = dmp.patch_toText(dmp.patch_make(this.state.previousSavedText, this.state.input));

      query(`/api/note/${this.state.noteId}/`, "PATCH", {
        diff: patchText
      }).then((result) => {
        console.log(result);
      });
      this.state.previousSavedText = this.state.input;
    }
    else {
      // Create a new note
      query(`/api/note/`, "POST", {
        public: false,
        readOnly: false,
        sharedWith: [],
        content: this.state.input
      }).then((result) => {
        this.setState({ existsInDatabase: true, noteId: result.id, previousSavedText: this.state.input });
      });
    }
  }

  _loadFromDatabase(id) {
    id = parseInt(id);

    if (isNaN(id)) {
      this.setState({ defaultInput: "# Could not load this note\n\nInvalid ID specified\n\nEdit this note to create a new one" });
    }
    else {
      query(`/api/note/${id}`).then((result) => {
        if (result.id === undefined) {
          this.setState({ defaultInput: "# Could not load this note\n\n**Error detail**: " + result.detail + "\n\nMake sure you have the permission to read this note\n\nEdit this note to create a new one" });
        }
        else {
          this.setState({ defaultInput: result.content, existsInDatabase: true, previousSavedText: result.content, noteId: id });
        }
      }).catch((error) => {
        this.setState({ defaultInput: "# Could not load this note\n\nMake sure you are connected to the internet\n\nEdit this note to create a new one" });
      });

    }

  }

  componentDidMount() {
    if (this.props.match.params.id === "new") {
      this.setState({ defaultInput: "# Note name\n\n" });
    } else {
      this._loadFromDatabase(this.props.match.params.id);
    }
  }

  render() {
    return (
      <div>
        <div id="editor">
          <CodeMirror
            value={this.state.defaultInput}
            options={{
              mode: "md",
              theme: "material",
              lineNumbers: true,
            }}
            onChange={(editor, data, value) => {
              this.setState({ input: value });

              // Save when the user uses space, paste something, add a new line, delete a space or remove a lot of text (ctrl-backspace)
              if (
                (data.origin === "paste") ||
                (data.text !== undefined && data.text[0] === " " || data.text.length === 2) ||
                (data.removed !== undefined && (data.removed[0] === " " || (data.removed[0].length > 2 && data.origin === "+delete")))
              ) {
                this._saveNote();
              }
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