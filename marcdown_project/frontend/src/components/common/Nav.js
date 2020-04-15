import React, { Component } from "react";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";
import NavItem from "./NavItem"

/**
 * Navigation bar
 */
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
                            <NavItem isActive={(match, location) => location && location.pathname.includes("/note/")} url="/note/new">New Note</NavItem>
                        </li>
                        <li>
                            <a href="/logout">Logout</a>
                        </li>
                    </ul>
                </nav>
            </HashRouter>
        );
    }
}

export default Nav;
