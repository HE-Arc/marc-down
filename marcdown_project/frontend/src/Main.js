import React, { Component } from "react";

import {
  Route,
  Switch
} from "react-router-dom";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";

import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Nav from "./components/common/Nav";
import { PrivateRoute } from "./components/PrivateRoute";

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        <HashRouter>
          <Switch>
            <Route path="/note/:id"
              render={({ match }) => <Editor match={match} />}>
            </Route>
            <PrivateRoute exact path="/" component={Home} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
