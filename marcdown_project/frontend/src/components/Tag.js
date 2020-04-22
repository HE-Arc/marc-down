
import React, { Component } from "react";

/**
 * Literally a span with a specific class, could probably be deleted
 */
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