
import React, { Component } from "react";

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed: false
        };
    }

    /**
     * Display the modal
     */
    display() {
        this.setState({
            displayed: true
        });
    }

    /**
     * Hide the modal
     */
    hide() {
        this.setState({
            displayed: false
        });
    }

    /**
     * Hide the modal when background is clicked, intended to be a callback
     * @param {event} e a click event
     */
    _hideOnClick(e) {
        if (e.target.classList.contains("modal-background")) {
            this.hide();
        }
    }

    render(...rest) {
        return (
            this.state.displayed ? <div onClick={(e) => { this._hideOnClick(e); }} className="modal-background">
                <div className="modal">{this.props.children}</div>
            </div> : null
        );
    }
}