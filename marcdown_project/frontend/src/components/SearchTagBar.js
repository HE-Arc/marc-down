import React, { Component } from "react";

export default class SearchTagBar extends Component {
    constructor(props) {
        super(props);
    }

    render(...rest) {
        return (
            <input defaultValue={this.props.searchValue} type="text" placeholder="Filter notes by tags" onChange={(e) => {
                this.props.onSearchChange(e.target.value);
            }} />
        );
    }
}