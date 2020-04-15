import React, { Component } from "react";

/**
 * Searchbar on the main page
 * Note: SearchBar and SearchTagBar could definitely be merged into one in the future
 */
export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    render(...rest) {
        return (
            <input id="input-search-note" defaultValue={this.props.searchValue} type="text" placeholder="Filter notes by name" onChange={(e) => {
                this.props.onSearchChange(e.target.value);
            }} />
        );
    }
}