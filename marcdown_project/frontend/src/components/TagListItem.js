
import React, { Component } from "react";

/**
 * A clickable p (SHOULD BE A BUTTON IN THE FUTURE :()
 */
export default class TagListItem extends Component {
    constructor(props) {
        super(props);
    }

    render(...rest) {
        return (
            <p onClick={() => { this.props.clickAction(this.props.children) }}>{this.props.children + ` (${this.props.count})`}</p>
        );
    }
}