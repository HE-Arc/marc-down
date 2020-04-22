import React, { Component } from "react";

import Modal from "../components/Modal"
import query from "../helpers.js";

/**
 * Modal displayed for permission management
 */
export default class ModalPermissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputSharer: ""
        };
    }

    /**
     * Ask a confirmation, delete the note and redirect to main page
     */
    _deleteNote() {
        if (confirm("Delete this note?")) {
            query(`/api/note/${this.props.note.id}/`, "DELETE").then((result) => {
                this.props.redirectToMainPage();
            });
        }
    }

    _setReadOnly(readOnly) {
        query(`/api/note/${this.props.note.id}/`, "PUT", {
            readOnly: readOnly
        });

        // I'm not sure changing the props and notifying the parent of the change is the best thing to do
        this.props.note.readOnly = readOnly;
        this.props.onNoteUpdate(this.props.note);
    }

    _setPublic(isPublic) {
        query(`/api/note/${this.props.note.id}/`, "PUT", {
            public: isPublic
        });

        this.props.note.public = isPublic;
        this.props.onNoteUpdate(this.props.note);
    }


    _addSharedUser() {
        // Concat current sharers with the text input
        let newSharedArray = [...this.props.note.sharedWith, this.state.inputSharer];
        this.setState({ inputSharer: "" });

        query(`/api/note/${this.props.note.id}/`, "PUT", {
            sharedWith: newSharedArray
        }).then((result) => {
            // Remove bad sharers and update
            if (result.badSharerNames.length > 0) {
                this.setState({ inputSharer: "User not found" });
                document.getElementById("input-sharer").select();
                newSharedArray.splice(newSharedArray.indexOf(result.badSharerNames), 1);
            }

            this.props.note.sharedWith = newSharedArray;
            this.props.onNoteUpdate(this.props.note);
        });
    }

    _removeSharedUser(index) {
        let sharedWith = this.props.note.sharedWith;
        sharedWith.splice(index, 1);

        query(`/api/note/${this.props.note.id}/`, "PUT", {
            sharedWith: sharedWith
        });

        this.props.note.sharedWith = sharedWith;
        this.props.onNoteUpdate(this.props.note);
    }


    render(...rest) {
        return (
            <Modal onBackgroundClicked={this.props.onBackgroundClicked} displayed={this.props.displayed}>

                <span className="header">Permissions</span>
                <p>
                    <label>
                        <input
                            type="checkbox"
                            defaultChecked={this.props.note.public}
                            onChange={(e) => { this._setPublic(e.target.checked) }}
                        />
                        Public (everyone can see and edit)
                    </label>
                </p>

                <p>
                    <label>
                        <input
                            type="checkbox"
                            defaultChecked={this.props.note.readOnly}
                            onChange={(e) => { this._setReadOnly(e.target.checked) }}
                        />
                        Read only (only you can edit)
                    </label>
                </p>

                <span className="header">Shared with</span>
                <p>
                    <input
                        id="input-sharer"
                        value={this.state.inputSharer}
                        type="text"
                        placeholder="Username"
                        onChange={(e) => { this.setState({ inputSharer: e.target.value }) }}
                    />
                    <button onClick={() => { this._addSharedUser() }} className="share-button">Share</button>
                </p>

                <div className="user-list-container">
                    <p>Click on a username to remove it from the list: </p>
                    {
                        this.props.note.sharedWith.map((username, key) =>
                            <span
                                key={key}
                                onClick={() => { this._removeSharedUser(username); }}
                                className="shared-with"
                            >
                                {username}
                            </span>
                        )
                    }
                    {this.props.note.sharedWith.length === 0 ? <p>Not shared with anyone</p> : ""}
                </div>

                <span className="header">Advanced</span>
                <p>
                    <button onClick={() => { this._deleteNote() }} className="danger">Delete this note</button>
                </p>
            </Modal>
        );
    }
}