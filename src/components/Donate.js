import React, { Component } from 'react';

const AMOUNT_PATTERN = new RegExp(/^(\$)?([0-9]+)(\.([0-9]{1,2}))$/);
const CARD_NUMBER_PATTERN = new RegExp(/^([0-9]{4}-){3}([0-9]{4})$/);
const EXPIRATION_DATE_PATTERN = new RegExp(/^[0-9]{2}\/[0-9]{2}$/);
const SECURITY_CODE_PATTERN = new RegExp(/^[0-9]{3,4}$/);
const ZIPCODE_PATTERN = new RegExp(/^[0-9]{5}$/);

/**
 * Contains the logic and rendering elements to support anonymous and 
 * non-anonymous donations and performs some form validation.
 */
class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
            amount: "$0.00",
            name: "",
            cardNumber: "",
            exp: "",
            securityCode: "",
            zip: "",
            amountIsValid: true,
            nameIsValid: true,
            cardNumberIsValid: true,
            expIsValid: true,
            securityCodeIsValid: true,
            zipIsValid: true,
            success: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmission = this.onSubmission.bind(this);
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
        
        //form validation
        if(name === 'amount') {
            this.setState({amountIsValid: AMOUNT_PATTERN.test(value)});
        }else if (name === 'name') {
            this.setState({nameIsValid: name.length > 0});
        }else if (name === 'cardNumber') {
            this.setState({cardNumberIsValid: CARD_NUMBER_PATTERN.test(value)});
        }else if (name === 'exp') {
            this.setState({expIsValid: EXPIRATION_DATE_PATTERN.test(value)});
        }else if (name === 'securityCode') {
            this.setState({securityCodeIsValid: SECURITY_CODE_PATTERN.test(value)});
        }else if (name === 'zip') {
            this.setState({zipIsValid: ZIPCODE_PATTERN.test(value)});
        }       
    }

    /**
     * Performs form validation and if all is valid, it will update the state
     * that a donation was made successfully.
     * @param {Object} e The object for when the form is submitted.
     */
    onSubmission(e) {
        e.preventDefault();

        this.setState(prev => {
            let newState = {
                success: true
            }

            if(!AMOUNT_PATTERN.test(prev.amount)) {
                newState.success = false;
                newState.amountIsValid = false;
            }
            if(prev.name.length === 0) {
                newState.success = false;
                newState.nameIsValid = false;
            }
            if(!CARD_NUMBER_PATTERN.test(prev.cardNumber)) {
                newState.success = false;
                newState.cardNumberIsValid = false;
            }
            if(!EXPIRATION_DATE_PATTERN.test(prev.exp)) {
                newState.success = false;
                newState.expIsValid = false;
            }
            if(!SECURITY_CODE_PATTERN.test(prev.securityCode)) {
                newState.success = false;
                newState.securityCodeIsValid = false;
            }
            if(!ZIPCODE_PATTERN.test(prev.zip)) {
                newState.success = false;
                newState.zipIsValid = false;
            }

            return newState;

        });

    }

    render() {
        if(this.state.success) {
            return (
                <main className="success-container">
                    <h1>Thank you for your donation!</h1>
                    <p><a href="/">Return to home...</a></p>
                </main> 
            )
        }

        const pageHeader = this.state.isLoggedIn ? "Make Donation" : "Make Anonymous Donation";
        const donationButton = this.state.isLoggedIn && <button className="confirm-button" type="submit">Make Donation</button>;
        return (
            <main className="form-container">
                <form onSubmit={this.onSubmission}>
                    <h1>{pageHeader}</h1>
                    <div>
                        <label htmlFor="amount">Amount: </label>
                        <input type="text" name="amount" 
                            value={this.state.amount}
                            onChange={this.onChange}
                            className={!this.state.amountIsValid ? 'error-border align-right' : 'align-right'} />
                        <br />
                        <span className={!this.state.amountIsValid ? 'error-message' : 'hide-error'}>Please enter a valid amount.</span>
                        <br />
                        <label htmlFor="name">Name on card: </label>
                        <input type="text" name="name" 
                            value={this.state.name}
                            onChange={this.onChange}
                            className={!this.state.nameIsValid ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.nameIsValid ? 'error-message' : 'hide-error'} >Please enter a name.</span>
                        <br />
                        <label htmlFor="cardNumber">Card Number: </label>
                        <input type="text" name="cardNumber" 
                            value={this.state.cardNumber}
                            onChange={this.onChange}
                            className={!this.state.cardNumberIsValid ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.cardNumberIsValid ? 'error-message' : 'hide-error'}>Please enter a valid credit card number.</span>
                        <br />
                        <label htmlFor="exp">Expiration Date (mm/yy): </label>
                        <input type="text" name="exp" 
                            value={this.state.exp}
                            onChange={this.onChange}
                            className={!this.state.expIsValid ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.expIsValid ? 'error-message' : 'hide-error'}>Please enter a valid expiration date.</span>
                        <br />
                        <label htmlFor="securityCode">Security Code: </label>
                        <input type="text" name="securityCode" 
                            value={this.state.securityCode}
                            onChange={this.onChange}
                            className={!this.state.securityCodeIsValid ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.securityCodeIsValid ? 'error-message' : 'hide-error'}>Please enter a valid security code.</span>
                        <br />
                        <label htmlFor="zip">Zipcode: </label>
                        <input type="text" name="zip" 
                            value={this.state.zip}
                            onChange={this.onChange}
                            className={!this.state.zipIsValid ? 'error-border' : ''} />
                        <br />
                        <span className={!this.state.zipIsValid ? 'error-message' : 'hide-error'}>Please enter a valid zipcode.</span>
                        <br />
                    </div>
                    <div>
                        <button type="submit">Make Anonymous Donation</button>
                        {donationButton}
                    </div>
                </form>
            </main>
        )
    }
}

export default Donate;