import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2"
import { Route, Redirect, BrowserRouter } from "react-router-dom";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../static/styles/code-mirror.css"
import query from "../helpers.js";
import ReactMarkdown from "react-markdown"
import DiffMatchPatch from "diff-match-patch";
import ModalPermissions from "../components/ModalPermissions"
import EditorTextButton from "../components/EditorTextButton";

const dmp = new DiffMatchPatch();

const TYPE_TIMER_SAVE_DELAY = 1000; // in ms

/**
 * Editor, manage note loading and displaying
 */
class Editor extends Component {
    constructor(params) {
        super(params);

        this.state = {
            redirectToMainPage: false,
            modalPermissionDisplayed: false,
            defaultInputValue: "Loading...", // Track default and current separately to fix an issue related to codemirror updating twice
            currentInputValue: "",
            noteTextInput: "",
            note: {
                id: null,
                isOwner: true,
                public: false,
                readOnly: false,
                sharedWith: []
            },
        };

        // Store codemirror last state to be able to append values to it
        this.codemirror = {
            lastKnownPos: undefined,
            editor: undefined
        };

        this.lastSavedText = "";
        this.saveIntervalId = -1;
    }

    /**
     * Replace editor content by message
     * @param {string} message
     */
    _setErrorMessage(message) {
        // TODO: Better handling than just displaying in editor
        this.setState({ defaultInput: message });
    }


    /**
     * Attempt to load a note from database
     * @param {Number} id 
     */
    _loadFromDatabase(id) {
        if (isNaN(id)) {
            this._setErrorMessage("# Could not load this note\n\nInvalid ID specified\n\nEdit this note to create a new one");
        } else {
            query(`/api/note/${id}`).then((result) => {
                if (result.id === undefined) {
                    this._setErrorMessage(`# Could not load this note\n\n**Error detail**: ${result.detail}\n\nMake sure you have the permission to read this note\n\nEdit this note to create a new one`);
                } else {
                    const sharedWith = result.sharers.map(r => r.name);

                    this.lastSavedText = result.content;
                    this.setState({
                        defaultInput: result.content,
                        note: {
                            id: id,
                            isOwner: result.is_owner,
                            public: result.public,
                            readOnly: result.read_only,
                            sharedWith: sharedWith
                        }
                    });
                }
            }).catch((error) => {
                console.log(error);
                this.setState({ defaultInput: "# Could not load this note\n\nMake sure you are connected to the internet\n\nEdit this note to create a new one" });
            });
        }
    }

    /**
     * Attempt to save the note to the db
     */
    _saveNote() {
        clearTimeout(this.saveIntervalId);
        // Does the note already exists in the database ?
        if (this.state.note.id !== null) {

            // Compute difference
            const patchText = dmp.patch_toText(dmp.patch_make(this.lastSavedText, this.state.currentInputValue));
            if (patchText === "") {
                // Nothing changed
                return;
            }

            query(`/api/note/${this.state.note.id}/`, "PATCH", {
                diff: patchText
            }).catch(() => {
                // TODO: Better error handling (e.g, allow the user to copy what he did)
                alert("Something went wrong when updating the note. You may be out of sync, the page will be reloaded.");
                location.reload();
            });

            this.lastSavedText = this.state.currentInputValue;

        } else {
            // Create a new note
            query(`/api/note/`, "POST", {
                public: this.state.note.public,
                readOnly: this.state.note.readOnly,
                sharedWith: this.state.note.sharedWith,
                content: this.state.currentInputValue
            }).then((result) => {
                if (result.id !== undefined) {
                    // It worked, update the hash
                    location.hash = `/note/${result.id}`;
                    this.lastSavedText = this.state.currentInputValue;

                    this.setState({
                        note: {
                            ...this.state.note,
                            id: result.id
                        }
                    });
                }
                else {
                    // At the moment, if any error occur we assume the user is logged out
                    this._setErrorMessage("# You are not logged in!\n\nClick [here](/login) to go to the login page.\n\n\n\n(Yes you can still type, but it won't be saved)\n\n---\n");
                    this.setState({ note: { id: null, readOnly: true, isOwner: false } });
                }
            });
        }
    }

    /**
     * Clear previous save timer and restart it
     */
    restartTimer() {
        clearTimeout(this.saveIntervalId);
        this.saveIntervalId = setTimeout(() => {
            this._saveNote();
        }, TYPE_TIMER_SAVE_DELAY);
    }

    /**
     * Saves the note before leaving and clear timer
     */
    componentWillUnmount() {
        this._saveNote();
    }

    /**
     * Append text at last known cursor position
     * @param {String} text 
     */
    _appendText(text) {
        this.codemirror.editor.replaceRange(text, this.codemirror.lastKnownPos);
    }

    /**
     * Set flag to route to main page
     */
    _redirectToMainPage() {
        this.setState({ redirectToMainPage: true });
    }

    /**
     * Change note state to update it (used by permission modal)
     * @param {Object} note 
     */
    _updateNote(note) {
        this.setState({ note: note });
    }

    /**
     * Handle loading a note or create a new one
     */
    componentDidMount() {
        if (this.props.match.params.id === "new") {
            this.setState({ defaultInput: "# Note name\n\n###### tags: `untagged`" });
        } else {
            this._loadFromDatabase(parseInt(this.props.match.params.id));
        }
    }

    render() {
        if (this.state.redirectToMainPage) {
            return <Route><Redirect to="/" /></Route>
        }

        return (
            <div>
                <div id="editor">
                    <div id="editor-tools">
                        <EditorTextButton onClick={() => { this._appendText("[](url)") }}>Link</EditorTextButton>
                        <EditorTextButton onClick={() => { this._appendText("![](url)") }}>Image</EditorTextButton>
                        {
                            this.state.note.isOwner ?
                                <span className="right">
                                    <EditorTextButton onClick={() => { this.setState({ modalPermissionDisplayed: true }) }}>
                                        Manage Permissions
                                    </EditorTextButton>
                                </span>
                                : null
                        }
                    </div>
                    <CodeMirror
                        value={this.state.defaultInput}
                        options={{
                            theme: "material",
                            lineNumbers: true,
                        }}
                        onCursor={(editor, data) => {
                            this.codemirror = {
                                lastKnownPos: data,
                                editor: editor
                            };
                        }}
                        onChange={(editor, data, value) => {
                            this.setState({ currentInputValue: value });
                            if (data.origin !== undefined) {
                                this.restartTimer();
                            }

                            if (
                                (data.origin === "paste" || data.origin === "undo" || data.origin === "redo") ||         // undo redo paste
                                (data.origin === "+input" && (data.text[0] === " " || data.text.length === 2)) ||        // add space or new line
                                (data.origin === "+delete" && (data.removed[0] === " " || (data.removed[0].length > 2))) // delete space or a lot of text
                            ) {
                                this._saveNote();
                            }
                        }}
                    />
                </div>
                <div id="md-render" className={this.state.note.readOnly && !this.state.note.isOwner ? "read-only" : ""}>
                    <ReactMarkdown source={this.state.currentInputValue} />
                </div>
                <ModalPermissions
                    onBackgroundClicked={() => this.setState({ modalPermissionDisplayed: false })}
                    onNoteUpdate={(note) => { this._updateNote(note); }}
                    redirectToMainPage={() => { this._redirectToMainPage(); }}
                    note={this.state.note}
                    displayed={this.state.modalPermissionDisplayed}
                />
            </div >
        );
    }
}

export default Editor;