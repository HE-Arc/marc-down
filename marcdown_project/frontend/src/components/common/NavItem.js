import React, { Component } from "react";

import {
    NavLink,
} from "react-router-dom";

/**
 * That's literally a NavLink.
 * This class should be deleted as it's literally useless. It was created before we knew how react worked
 */
class NavItem extends Component {
    constructor(params) {
        super(params);
    }

    render() {
        return (
            <NavLink exact={this.props.exact || false} to={this.props.url} {...this.props}>{this.props.children}</NavLink>
        );
    }
}

export default NavItem;
