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
          <ul>
            <li>
              <NavItem url="/" text="Home" exact={true} />
            </li>
            <li>
              <NavItem url="/editor" text="Editor" />
            </li>
          </ul>
        </nav>
      </HashRouter>
    );
  }
}

export default Nav;
