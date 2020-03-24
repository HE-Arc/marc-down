import React, { Component } from "react";

import {
  NavLink,
} from "react-router-dom";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";


class Main extends Component {
  render() {
    return (
      <HashRouter>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/editor">Editor</NavLink>
              </li>
            </ul>
          </nav>
      </HashRouter>
    );
  }
}

export default Main;
