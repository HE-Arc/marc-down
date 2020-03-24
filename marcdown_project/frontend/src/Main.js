import React, { Component } from "react";

import {
  Route,
  Switch
} from "react-router-dom";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";

import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Nav from "./components/common/Nav";

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        <HashRouter>
          <Switch>
            <Route path="/editor">
              <Editor />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
