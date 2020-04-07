
import React, { Component } from "react";

export default class Tag extends Component {
    constructor(props) {
        super(props);
    }
    
    render(...rest) {
        return (
            <span className="note-tag">{this.props.children}</span>
        );
    }
}