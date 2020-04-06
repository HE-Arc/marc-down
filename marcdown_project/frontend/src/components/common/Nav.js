import React, { Component } from "react";

import {
  NavLink,
} from "react-router-dom";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";

import NavItem from "./NavItem"


class Nav extends Component {
  render() {
    return (
      <HashRouter>
        <nav>
          <NavItem url="/" text="" exact={true} >
            <img id="logo" src="/static/images/logo.png" alt="" /><span id="site-name">Marc-Down</span>
          </NavItem>
          <ul>
            <li>
              <NavItem url="/" exact={true}>Home</NavItem>
            </li>
            <li>
              <NavItem url="/note/new">Editor</NavItem>
            </li>
            <li>
              <NavItem url="/logout">Logout</NavItem>
            </li>
          </ul>
        </nav>
      </HashRouter>
    );
  }
}

export default Nav;
