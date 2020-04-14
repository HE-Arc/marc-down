import React, { Component } from "react";

import {
    NavLink,
} from "react-router-dom";

class NavItem extends Component {
    constructor(params) {
        super(params);
    }

    render() {
        return (
            <NavLink exact={this.props.exact || false} to={this.props.url}>{this.props.children}</NavLink>
        );
    }
}

export default NavItem;
