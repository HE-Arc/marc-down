
import React, { Component } from "react";

/**
 * Modal with a darker background
 */
export default class Modal extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Call onBackgroundClicked props when the bg is clicked, should update the props to hide the modal
     * @param {event} e a click event
     */
    _hideOnClick(e) {
        if (e.target.classList.contains("modal-background")) {
            this.props.onBackgroundClicked();
        }
    }

    render(...rest) {
        return (
            this.props.displayed ? <div onClick={(e) => { this._hideOnClick(e); }} className="modal-background">
                <div className="modal">{this.props.children}</div>
            </div> : null
        );
    }
}