import React, { Component } from "react";

import TagListItem from "./TagListItem.js";

export default class TagList extends Component {
    constructor(props) {
        super(props);
    }

    render(...rest) {
        return (<div id="tags-list">

            {/* Add a default tag to display all notes */}
            <TagListItem clickAction={() => { this.props.onTagSelected("") }} key={-1} count={this.props.totalCardCount}>
                All notes
            </TagListItem>

            {Object.keys(this.props.tags).map((key, index) =>
                <TagListItem clickAction={(name) => { this.props.onTagSelected(name) }} key={index} count={this.props.tags[key]}>{key}</TagListItem>
            )}
        </div>);
    }
}