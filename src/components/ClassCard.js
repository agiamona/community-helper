import React, { Component } from 'react';

/**
 * Contains the logic and rendering elements to display the details of a
 * class and allow the user to enroll in that class.
 */
class ClassEnrollmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            class: props.class,
            isEnrolled: false,
            isLoggedIn: props.isLoggedIn,
            showDetailsHandler: props.showDetails
        }
        this.enroll = this.enroll.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
    }
    /**
     * Sets the state that the user is enrolled in the course.
     */
    enroll() {
        this.setState({isEnrolled: true});

        this.setState(prevState => {
            let newClass = {...prevState.class};
            newClass.openSeats = newClass.openSeats - 1;
            let newState = {
                class: newClass
            }

            return newState;
        });
    }

    /**
     * Sets the state that the user has clicked the enroll button, and now the
     * confirm and cancel buttons should be shown.
     */
    showConfirm() {
        this.setState(prevState => {
            return {showConfirm: !prevState.showConfirm};
        })
    }
    render() {
        const price = (this.state.class.price === 0.00 ? "Free" : "$" + this.state.class.price);
        let buttons;

        if(this.state.isEnrolled) {
            buttons = <p className="request-submitted">Enrolled!</p>
        }else if(this.state.showConfirm) {
            buttons =<> <button onClick={this.showConfirm}>Cancel</button> 
                        <button className="confirm-button" onClick={this.enroll}>Confirm</button></>;
        }else {
            buttons = <button className="confirm-button" onClick={this.showConfirm}>Enroll</button>;
        }

        return (
            <div className="fade-out-screen">
                <div className="card-container light-card">
                    <h3>{this.state.class.title}</h3>
                    <p onClick={this.state.showDetailsHandler}><i className="far fa-window-close close-pane"></i></p>
                    <p>Price: {price}</p>
                    <p>{this.state.class.description}</p>
                    <p>Start Date: {this.state.class.startDate}</p>
                    <p>Class Meetings: {this.state.class.meetings}</p>
                    <p>Openings Remaining: {this.state.class.openSeats}</p>

                    { this.state.class.price > 0.00 && this.state.isLoggedIn ?
                     <form onSubmit={e => {e.preventDefault()}}>
                        <h4>Payment Information</h4>
                        <div>
                            <label htmlFor="name">Name on card: </label>
                            <input type="text" name="name" />
                            <br />
                            <label htmlFor="cardNumber">Card Number: </label>
                            <input type="text" name="cardNumber" />
                            <br />
                            <label htmlFor="exp">Expiration Date (mm/yy): </label>
                            <input type="text" name="exp" />
                            <br />
                            <label htmlFor="securityCode">Security Code: </label>
                            <input type="text" name="securityCode" />
                            <br />
                            <label htmlFor="zip">Zipcode: </label>
                            <input type="text" name="zip" />
                            <br />
                        </div>
                        <br />
                        {buttons}
                    </form> 

                    : (this.state.isLoggedIn ? buttons : <p className="login-message">Please log in to enroll.</p>)
                    }
                
                </div>
            </div>
        );
        
    }
}

/**
 * Contains the logic and rendering components to display the basic information
 * of a class offered in a card format.
 */
class ClassCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: props.class,
            isLoggedIn: props.isLoggedIn,
            isEnrolled: false,
            showDetails: false
        }
        this.showDetails = this.showDetails.bind(this);
    }

    /**
     * Sets that state that the details for this class should be shown.
     */
    showDetails() {
        this.setState(prevState => {return {showDetails: !prevState.showDetails} });        
    }

    render() {
        const price = (this.state.class.price === 0.00 ? "Free" : "$" + this.state.class.price);
        if(this.state.showDetails) {
            return (
                <ClassEnrollmentForm 
                    class={this.state.class} 
                    showDetails={this.showDetails} 
                    isLoggedIn={this.state.isLoggedIn}
                />
            );
        }

        return (
            <div className="card-container">
                <h3>{this.state.class.title}</h3>
                <p>Price: {price}</p>
                <br />
                <button className="confirm-button" onClick={this.showDetails}>View Details</button>
            </div>
        );
    }

}

export default ClassCard;