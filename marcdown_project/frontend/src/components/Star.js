
import React, { Component } from "react";

export default class Star extends Component {
    constructor(props) {
        super(props);
    }

    render(...rest) {
        return (
            <div className="note-star">S</div>
        );
    }
}