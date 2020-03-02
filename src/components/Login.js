import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'

/**
 * Contains the rendering and logic components for the login page and form.
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            users: props.users,
            handleLogIn: props.handleLogIn,
            success: false,
            invalidInput: false
        }
        this.onSubmission = this.onSubmission.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Updates the state to the input's new value.
     * @param {Object} e The object fir the change event.
     */    
    onChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });          
        
    }

    /**
     * Performs credential validation and if a match if found, it will update the 
     * state that the user is logged in.
     * @param {Object} e The object for when the form is submitted.
     */
    onSubmission(e) {
        e.preventDefault();
        const match = this.state.users.filter(user =>  
            (user.username.toLowerCase() === this.state.username.toLowerCase()) 
            && (user.password === this.state.password)
        );

        if (match.length > 0) {
            this.setState({success: true});
            this.state.handleLogIn(this.state.username);            
        }else {
            this.setState({invalidInput: true});
        }

    }
    render() {
        if(this.state.success) {
            return <Redirect to='/account'  />;
        }
        const spanStyle = this.state.invalidInput ? 'error-message' : 'hide-error';
        const inputBorder = this.state.invalidInput ? 'error-border' : '';
        return (
            <main className="form-container">
                <form onSubmit={this.onSubmission}>
                    <h1>Please Login to your account</h1>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" 
                            value={this.state.username}
                            onChange={this.onChange}
                            className={inputBorder}
                        />
                        <br />
                        <span className={spanStyle}>Please enter a valid username.</span>
                        <br />
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" 
                            value={this.state.password}
                            onChange={this.onChange}
                            className={inputBorder}
                        />
                        <br />
                        <span className={spanStyle} >Please enter a matching password.</span>
                        <br />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </main>
        )
    }
}

export default Login;