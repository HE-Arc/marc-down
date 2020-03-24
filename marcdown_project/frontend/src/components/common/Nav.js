import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


class Main extends Component {
  render() {
    return (
      <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/editor">Editor</Link>
              </li>
            </ul>
          </nav>
      </Router>
    );
  }
}

export default Main;
