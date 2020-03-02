import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**
 * Contains the rendering components for the footer and conditional logic that
 * determines if "account"/"log out" or "create account"/"log in" options should 
 * be shown.
 */
class Footer extends Component {
    render() {
        const logInElement = this.props.isLoggedIn ?
                                    <Link onClick={this.props.handleLogOut} to="/">Log Out</Link> :
                                    <Link to="/login">Log In</Link>;
        const accountElement = this.props.isLoggedIn ?
                                    <Link to="/account">My Account</Link> :
                                    <Link to="/register">Create Account</Link>;
        return (

            <footer>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/donate">Donate</Link></li>
                    </ul>
                    <ul>
                        <li>{logInElement}</li>
                        <li>{accountElement}</li>
                    </ul>
                </div>
                <p className="copyright">All images were released to public domain and accessed from Pixabay.com</p>
            </footer>
        )
    }

}

export default Footer;