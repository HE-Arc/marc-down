
import React, { Component } from "react";

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed: false
        };
    }

    display() {
        this.setState({
            displayed: true
        });
    }

    hide() {
        this.setState({
            displayed: false
        });
    }

    hideOnClick(e) {
        if (e.target.classList.contains("modal-background")) {
            this.hide();
        }
    }

    render(...rest) {
        return (
            this.state.displayed ? <div onClick={(e) => { this.hideOnClick(e); }} className="modal-background">
                <div className="modal">{this.props.children}</div>
            </div> : null
        );
    }
}