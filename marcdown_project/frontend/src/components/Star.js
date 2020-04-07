
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
        let id = Math.floor(Math.random() * 10000);
        return (
            <label htmlFor={"star_" + id} className="note-star">
                <input id={"star_" + id} defaultChecked={this.state.starred} className="note-star starbox" type="checkbox" onChange={(e) => { this._updateStarred(e.target.checked) }} />
                <span></span>
            </label>
        );
    }
}