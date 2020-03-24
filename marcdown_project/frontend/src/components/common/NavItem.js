import React, { Component } from "react";

import {
    NavLink,
  } from "react-router-dom";

class NavItem extends Component {
  render() {
    return (
        <NavLink exact={this.props.exact || false} to={this.props.url}>{this.props.text}</NavLink>
    );
  }
}

export default NavItem;
