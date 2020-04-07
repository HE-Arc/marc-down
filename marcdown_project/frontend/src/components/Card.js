// Based on https://tylermcginnis.com/react-router-protected-routes-authentication/
import React, { Component } from "react";
import Tag from "./Tag.js"
import Star from "./Star.js"
import {
    Link,
} from "react-router-dom";

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
                <Link className="wrap-link" to={`/note/${this.props.id}`} />
                <Star noteId={this.props.id} starred={this.props.starred}/>
                <span className="title">{this.props.children}</span>
                <div>
                    {this.props.tags.map((tag, key) =>
                        <Tag key={key}>{tag.name}</Tag>
                    )}
                </div>
                <div className="note-owner">{this.props.owner}</div>
            </div>
        );
    }
}