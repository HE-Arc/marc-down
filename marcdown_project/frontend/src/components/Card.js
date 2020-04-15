import React, { Component } from "react";
import Tag from "./Tag.js"
import Star from "./Star.js"

import {
    Link,
} from "react-router-dom";

/**
 * Card displayed on the home page
 */
export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };
    }

    render(...rest) {
        return (
            <div className="note-card">
                <Link className="wrap-link" to={`/note/${this.props.card.id}`} />
                <Star card={this.props.card} />
                <span className="title">{this.props.children}</span>
                <div>
                    {this.props.card.tags.map((tag, key) =>
                        <Tag key={key}>{tag.name}</Tag>
                    )}
                </div>
                <div className="note-owner">{this.props.card.owner.name}</div>
            </div>
        );
    }
}