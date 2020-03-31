// Based on https://tylermcginnis.com/react-router-protected-routes-authentication/
import React, { Component } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";

// TODO: Use API
const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    logout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

class PrivateRoute extends Component {
    render(...rest) {
        return (
            fakeAuth.isAuthenticated === true ?
                <Route {...rest} render={(props) => (
                    <Component {...props} />
                )} />
                :
                <BrowserRouter forceRefresh={true}> {/* Workaround because we use an external login page */}
                    <Route basename="/">
                        <Redirect to="/login" />
                    </Route>
                </BrowserRouter>
        );
    }
}

export { PrivateRoute }; // TODO: Export auth