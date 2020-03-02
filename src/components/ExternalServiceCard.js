import React, { Component } from 'react';

/**
 * Contains the logic and rendering elements to display the details of an
 * external service and allow the user to rquest that service.
 */
class ExternalRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            service: props.service,
            madeRequest: false,
            isLoggedIn: props.isLoggedIn,
            showDetailsHandler: props.showDetails
        }
        this.requestSubmitted = this.requestSubmitted.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
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
        const input = this.state.service.format === "date" ? 
                <><label htmlFor="date">Select date to reserve: </label><input name="date" type="date" /> </>
                : <><label htmlFor="qty">Select quantity to reserve:</label> <input type="number" min="1" step="1" name="qty" value="1"/> </> ;
        
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
                    <p>{this.state.service.description}</p>
                    <label htmlFor="details">Request details:</label>
                    <br />
                    <textarea name="details"></textarea>
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
 * of an external service offered in a card format.
 */
class ExternalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: props.service,
            isLoggedIn: props.isLoggedIn,
            showConfirm: false,
            requestMade: false
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
        if(this.state.showDetails) {
            return (
                <ExternalRequestForm 
                    service={this.state.service} 
                    showDetails={this.showDetails} 
                    isLoggedIn={this.state.isLoggedIn}
                />
            );
        }

        return (
            <div className="card-container">
                <h3>{this.state.service.title}</h3>
                <br />
                <button className="confirm-button" onClick={this.showDetails}>View Details</button>
            </div>
        );
    }
}

export default ExternalCard;