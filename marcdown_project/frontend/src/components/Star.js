
import React, { Component } from "react";
import query from "../helpers.js";

/**
 * Star that can be toggled
 * In the future, should not use "props.card" to make it usable anywhere
 */
export default class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starred: this.props.card.starred
        };
    }

    /**
     * Query the API to update the card status, also update the card itself
     * @param {bool} starred 
     */
    _updateStarred(starred) {
        query(`/api/user/favorites/`, starred ? "POST" : "DELETE", {
            noteId: this.props.card.id
        });
        this.setState({ starred: starred });
        this.props.card.starred = starred;
    }

    render(...rest) {
        return (
            <label className="note-star">
                <input className="note-star starbox" type="checkbox"
                    checked={this.props.card.starred}
                    onChange={(e) => { this._updateStarred(e.target.checked) }}
                />
                <span></span>
            </label>
        );
    }
}