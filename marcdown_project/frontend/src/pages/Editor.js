import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2"
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../static/styles/code-mirror.css"
import query from "../helpers.js";
import ReactMarkdown from "react-markdown"
import DiffMatchPatch from "diff-match-patch";
import Modal from "../components/Modal"

const dmp = new DiffMatchPatch();



class Editor extends Component {
    constructor(params) {
        super(params);
        this.state = {
            input: "Loading...",
            existsInDatabase: false,
            previousSavedText: "",
            noteId: -1,
            modalDisplayed: false,
            public: false,
            readOnly: false,
            isOwner: true,
            sharedWith: []
        };

        this.modal = React.createRef();
    }

    _saveNote() {
        if (this.state.existsInDatabase) {
            const patchText = dmp.patch_toText(dmp.patch_make(this.state.previousSavedText, this.state.input));

            query(`/api/note/${this.state.noteId}/`, "PATCH", {
                diff: patchText
            }).then((result) => { });
            this.state.previousSavedText = this.state.input;
        } else {
            // Create a new note
            query(`/api/note/`, "POST", {
                public: false,
                readOnly: false,
                sharedWith: [],
                content: this.state.input
            }).then((result) => {
                location.hash = `/note/${result.id}`;
                this.setState({ existsInDatabase: true, noteId: result.id, previousSavedText: this.state.input });
            });
        }
    }

    _setReadOnly(readOnly) {
        query(`/api/note/${this.state.noteId}/`, "PUT", {
            readOnly: readOnly
        }).then((result) => { });
        this.setState({ readOnly: readOnly });
    }

    _setPublic(isPublic) {
        query(`/api/note/${this.state.noteId}/`, "PUT", {
            public: isPublic
        }).then((result) => { });
        this.setState({ public: isPublic });
    }

    _addSharedUser(username) {
        this.setState({ sharedWith: [...this.state.sharedWith, username] });
    }

    _loadFromDatabase(id) {
        id = parseInt(id);

        if (isNaN(id)) {
            this.setState({ defaultInput: "# Could not load this note\n\nInvalid ID specified\n\nEdit this note to create a new one" });
        } else {
            query(`/api/note/${id}`).then((result) => {
                if (result.id === undefined) {
                    this.setState({ defaultInput: "# Could not load this note\n\n**Error detail**: " + result.detail + "\n\nMake sure you have the permission to read this note\n\nEdit this note to create a new one" });
                } else {
                    this.setState({
                        defaultInput: result.content,
                        existsInDatabase: true,
                        previousSavedText: result.content,
                        noteId: id,
                        isOwner: result.is_owner,
                        public: result.public,
                        readOnly: result.read_only
                    });
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
                    <div id="editor-tools">
                        <span><button className="text-button">Bold</button></span>
                        <span><button className="text-button">Italic</button></span>
                        <span><button className="text-button">Link</button></span>
                        {this.state.isOwner ?
                            <span className="right">
                                <button onClick={() => { this.modal.current.display(); }} className="text-button">
                                    Manage Permissions
                  </button>
                            </span> : null
                        }
                    </div>
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
                <Modal ref={this.modal}>
                    <h1>Permissions</h1>
                    <p><label><input type="checkbox" defaultChecked={this.state.public} onChange={(e) => { this._setPublic(e.target.checked) }} /> Public (everyone can see and edit)</label></p>
                    <p><label><input type="checkbox" defaultChecked={this.state.readOnly} onChange={(e) => { this._setReadOnly(e.target.checked) }} /> Read only (only you can edit)</label></p>
                    <h1>Shared with</h1>
                    <p>Click on a username to remove it from the list</p>
                    <input type="text" placeholder="Username"></input><button className="share-button">Share</button>
                    <div className="user-list-container">
                        <span className="shared-with">ToyBla</span>
                        <span className="shared-with">WizzyG</span>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Editor;