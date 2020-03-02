import React, { Component } from 'react';

/**
 * Contains the logic and rendering elements to display the details of an
 * in-house service and allow the user to rquest that service.
 */
class InHouseRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            service: props.service,
            madeRequest: false,
            isLoggedIn: props.isLoggedIn,
            showDetailsHandler: props.showDetails,
            quantity: 1
        }
        this.requestSubmitted = this.requestSubmitted.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    /**
     * Updates the state to the input's new value.
     * @param {Object} e The object for the change event.
     */
    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    /**
     * Sets the state that the user submitted a request.
     */
    requestSubmitted() {
        this.setState({madeRequest: true});
    }
    /**
     * Sets the state that the user has clicked the make request button, and now the
     * confirm and cancel buttons should be shown.
     */    
    showConfirm() {
        this.setState(prevState => {
            return {showConfirm: !prevState.showConfirm};
        })
    }
    render() {
        const price = (this.state.service.price === 0.00 ? "Free" : "$" + this.state.service.price);
        const dateInput = <>
                            <br />
                            <label htmlFor="date">Select date to reserve: </label>
                            <input name="date" type="date" /> 
                            <br /> </>;

        let totalPrice = 0;
        if(this.state.service.showQuantity) {
            totalPrice = (this.state.service.price === 0.00 ? "Free" 
                            : "$" + (this.state.service.price * this.state.quantity));
        }
        const quantityInput = <>               
                                <br />    
                                <label htmlFor="quantity">Select quantity to reserve:</label>
                                <input  type="number" 
                                        min="1" 
                                        step="1" 
                                        name="quantity" 
                                        value={this.state.quantity} 
                                        onChange={this.handleChange }/> 
                                <p>Total price: {totalPrice}</p>
                                <br />
                            </>;        

        let buttons;
        if(this.state.madeRequest) {
            buttons = <p className="request-submitted">Request Submitted! We will contact you within the next business day.</p>
        }else if(this.state.showConfirm) {
            buttons =<> <button onClick={this.showConfirm}>Cancel</button>
                         <button className="confirm-button" onClick={this.requestSubmitted}>Confirm</button></>;
        }else {
            buttons = <button className="confirm-button" onClick={this.showConfirm}>Make Request</button>;
        }
        
        
        return (
            <div className="fade-out-screen">
                <div className="card-container light-card">
                    <h3>{this.state.service.title}</h3>
                    <p onClick={this.state.showDetailsHandler}><i className="far fa-window-close close-pane"></i></p>
                    <p>Price: {price} {this.state.service.priceUnit}</p>
                    <p>{this.state.service.description}</p>
                    
                    {this.state.service.showDate && dateInput}
                    {this.state.service.showQuantity && quantityInput}
                    <br />
                    <br />
                    {this.state.isLoggedIn ? buttons : <p className="login-message">Please log in to make request.</p>}
                </div>
            </div>
        );
    }

}

/**
 * Contains the logic and rendering components to display the basic information
 * of an in-house service offered in a card format.
 */
class InHouseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: props.service,
            isLoggedIn: props.isLoggedIn,
            requestMade: false,
            showConfirm: false
        }
        this.showDetails = this.showDetails.bind(this);
    }

    /**
     * Sets that state that the details for this service should be shown.
     */
    showDetails() {
        this.setState(prevState => {return {showDetails: !prevState.showDetails} });        
    }

    render() {
        const price = (this.state.service.price === 0.00 ? "Free" : "$" + this.state.service.price);
        if(this.state.showDetails) {
            return (
                <InHouseRequestForm 
                    service={this.state.service} 
                    showDetails={this.showDetails} 
                    isLoggedIn={this.state.isLoggedIn}
                />
            );
        }

        return (
            <div className="card-container">
                <h3>{this.state.service.title}</h3>
                <p>Price: {price} {this.state.service.priceUnit}</p>
                <br />
                <button className="confirm-button" onClick={this.showDetails}>View Details</button>
            </div>
        );
    }

}

export default InHouseCard;