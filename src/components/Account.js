import React, { Component } from 'react';
/**
 * Contains rendering elements for user's account page and with options to 
 * view more details about their account.
 */
class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: props.isLoggedIn,
            user: props.user
        }
    }

    render() {
        if(!this.state.isLoggedIn) {
            return (
                <main className="centered-content">
                    <h2 className="login-message">Please log in first.</h2>
                </main>
            );
        }
        return (
            <main className="centered-content">
                <h2>Customer Account</h2>
                <h3>Hi {this.state.user.name}!</h3>
                <br />
                <br />
                <a className="heading-button" href="/account/enrolled-classes">View classes you are enrolled in</a>
                <a className="heading-button" href="/account/requested-services">View services you have requested</a>
            </main>
        )
    }
}

export default Account;