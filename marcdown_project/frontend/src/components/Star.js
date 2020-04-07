
import React, { Component } from "react";

export default class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    render(...rest) {
        let id = Math.floor(Math.random() * 10000);
        return (
            <label htmlFor={"star_" + id} className="note-star">
                <input id={"star_" + id} value={this.state.checked} className="note-star starbox" type="checkbox" onChange={(e) => {
                    this.setState({ checked: !this.state.checked });
                }} /><span></span></label>
        );
    }
}