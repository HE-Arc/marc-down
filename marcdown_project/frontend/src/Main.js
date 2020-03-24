import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Nav from "./components/common/Nav";

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Router>
          <Switch>
            <Route path="/editor">
              <Editor />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;
