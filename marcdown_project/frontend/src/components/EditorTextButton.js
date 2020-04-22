import React, { Component } from "react";

/**
 * Button displayed on the editor top-bar
 */
export default class EditorTextButton extends Component {
    constructor(props) {
        super(props);
    }

    render(...rest) {
        return (
            <span>
                <button onClick={() => { this.props.onClick() }} className="text-button">{this.props.children}</button>
            </span>
        );
    }
}