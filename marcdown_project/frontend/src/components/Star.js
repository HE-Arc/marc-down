
import React, { Component } from "react";
import query from "../helpers.js";

export default class Star extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starred: props.starred
        };
    }

    _updateStarred(starred) {
        query(`/api/user/favorites/`, starred ? "POST" : "DELETE", {
            noteId: this.props.noteId
        });
        this.setState({ starred: starred });
    }

    render(...rest) {
        return (
            <label className="note-star">
                <input defaultChecked={this.state.starred} className="note-star starbox" type="checkbox" onChange={(e) => { this._updateStarred(e.target.checked) }} />
                <span></span>
            </label>
        );
    }
}