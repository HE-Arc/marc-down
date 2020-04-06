// Based on https://tylermcginnis.com/react-router-protected-routes-authentication/
import React, { Component } from "react";
import Tag from "./Tag.js"
import Star from "./Star.js"

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
                <Star />
                <span className="title">{this.props.children}</span>
                <div>
                    {this.props.tags.map((tag, key) =>
                        <Tag key={key}>{tag}</Tag>
                    )}
                </div>
                <div className="note-owner">{this.props.owner}</div>
            </div>
        );
    }
}