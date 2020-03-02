import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**
 * Contains the rendering components for the header (and navigation) and conditional 
 * logic that determines if "account"/"log out" or "register"/"log in" options should 
 * be shown.
 */
class Header extends Component {
    render() {
        const logInElement = this.props.isLoggedIn ?
                                    <Link onClick={this.props.handleLogOut} to="/">
                                        <i className="fas fa-key"></i>
                                        <br />Log Out
                                    </Link> :
                                    <Link to="/login">
                                        <i className="fas fa-key"></i>
                                        <br />Log In
                                    </Link>;
        const accountElement = this.props.isLoggedIn ?
                                    <Link to="/account">
                                        <i className="far fa-user-circle"></i>
                                        <br />Account
                                    </Link> :
                                    <Link to="/register">
                                        <i className="far fa-user-circle"></i>
                                        <br />Register
                                    </Link>;
        return (

            <header>
                <p id="logo"><Link to="/">Community Helper</Link></p>
                <nav>
                <ul className="nav-list">
                    <li><Link to="/services"><i className="fas fa-hands-helping"></i><br />Services</Link></li>
                    <li><Link to="/donate"><i className="fas fa-donate"></i><br />Donate</Link></li>
                    <li>{accountElement}</li>
                    <li>{logInElement}</li>
                </ul>
                </nav>
            </header>
        )
    }

}

export default Header;