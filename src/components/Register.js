import React, { Component } from 'react';

/**
 * Contains the logic and rendering elements to support creating a new
 * customer account and performs some form validation.
 */
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            username: "",
            name: "",
            password: "",
            address: "",
            email: "",
            validName: true,
            validUsername: true,
            validPassword: true,
            validEmail: true,
            validAddress: true,
            handleLogIn: props.handleLogIn
        }
        this.onSubmission = this.onSubmission.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Updates the state to the input's new value.
     * @param {Object} e The object for the change event.
     */    
    onChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });          
        
    }

    /**
     * Performs form validation and if all is valid, it will update the state
     * that an account was made successfully.
     * @param {Object} e The object for when the form is submitted.
     */
    onSubmission(e) {
        e.preventDefault();

        this.setState(prevState => {
            let state = {
                validName: (prevState.name.length > 0),
                validUsername: (prevState.username.length > 0),
                validPassword: (prevState.password.length > 0),
                validAddress: (prevState.address.length > 0),
                validEmail: (prevState.email.length > 0)
            }

            if(state.validName && state.validUsername && state.validPassword 
                        && state.validAddress && state.validEmail) {
                state.success = true;
                this.state.handleLogIn(this.state.username);
            }else {
                state.success = false;
            }
            return state;
        });
     }
    render() {
        if(this.state.success) {
            return (
                <main className="success-container">

                    <h1>Account created successfully!</h1>
                    <p><a href="/login">Please login to your new account...</a></p>
                </main> 
            )
        }

        return (
            <main className="form-container">
                <form onSubmit={this.onSubmission}>
                    <h1>Create New Account</h1>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" 
                            value={this.state.username}
                            onChange={this.onChange}
                            className={!this.state.validUsername ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.validUsername ? 'error-message' : 'hide-error'}>Please enter a valid username.</span>
                        <br />
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" 
                            value={this.state.password}
                            onChange={this.onChange}
                            className={!this.state.validPassword ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.validPassword ? 'error-message' : 'hide-error'} >Please enter a valid password.</span>
                        <br />
                        <label htmlFor="name">Full Name: </label>
                        <input type="text" name="name" 
                            value={this.state.name}
                            onChange={this.onChange}
                            className={!this.state.validName ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.validName ? 'error-message' : 'hide-error'}>Please enter your full name.</span>
                        <br />
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" 
                            value={this.state.email}
                            onChange={this.onChange}
                            className={!this.state.validEmail ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.validEmail ? 'error-message' : 'hide-error'}>Please enter your email.</span>
                        <br />
                        <label htmlFor="address">Address: </label>
                        <input type="text" name="address" 
                            value={this.state.address}
                            onChange={this.onChange}
                            className={!this.state.validAddress ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.validAddress ? 'error-message' : 'hide-error'}>Please enter your address.</span>
                        <br />
                    </div>
                    <button type="submit">Create Account</button>
                </form>
            </main>
        )
    }
}


export default Register;