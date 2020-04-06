// Based on https://tylermcginnis.com/react-router-protected-routes-authentication/
import React, { Component } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { auth } from "../authentication.js";


class PrivateRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toLogin: false,
            toMainPage: false
        };
    }

    componentDidMount() {
        auth.loggedIn().then((result) => {
            if (result) {
                this.setState({ toMainPage: true });
            }
            else {
                this.setState({ toLogin: true });
            }
        });
    }

    render(...rest) {
        if (this.state.toMainPage === true) {
            return <Route {...rest} render={(props) => (
                <this.props.component {...props} />
            )} />
        }

        if (this.state.toLogin) {
            return (<BrowserRouter forceRefresh={true}> {/* Workaround because we use an external login page */}
                <Route basename="/">
                    <Redirect to="/login" />
                </Route>
            </BrowserRouter>)
        }

        return null;
    }
}

export { PrivateRoute }; // TODO: Export auth