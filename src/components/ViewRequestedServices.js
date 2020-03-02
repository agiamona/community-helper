import React, { Component } from 'react';

/**
 * Displays in a card format, the details of an external service the user has 
 * requested and the status of their request.
 * @param {Object} props The data for this service.
 */
function ExternalRequestCard(props) {
    let statusMessage;
    if(props.request.status === 'Accepted!') {
        statusMessage = <p className="request-submitted">{props.request.status}</p>
    }else {
        statusMessage = <p className="login-message">{props.request.status}</p>
    }
    
    return (
        <div className="card-container">
            <h3>{props.service.title}</h3>
            <p>{props.service.description}</p>
            <br />
            <p>Request Details:</p>
            <p>{props.request.details}</p>
            <br />
            {statusMessage}
        </div>
    );
}

/**
 * Displays in a card format, the details of an in-house service the user has 
 * requested and the status of their request.
 * @param {Object} props The data for this service.
 */
function InHouseRequestCard(props) {
    const unitPrice = (props.service.price === 0.00 ? "Free" : "$" + props.service.price);
    let totalPriceElements;

    if(props.service.showQuantity) {
        let totalPrice = (props.service.price === 0.00 ? "Free" : "$" + (props.service.price * props.request.quantity));
        totalPriceElements = <>
                                <p>Requested Quantity: {props.request.quantity}</p>
                                <p>Total Price: {totalPrice}</p>
                            </>
    }

    let statusMessage;
    if(props.request.status === 'Accepted!') {
        statusMessage = <p className="request-submitted">{props.request.status}</p>
    }else {
        statusMessage = <p className="login-message">{props.request.status}</p>
    }

    return (
        <div className="card-container">
            <h3>{props.service.title}</h3>
            <p>{props.service.description}</p>
            <p>Date Requested: {props.request.date}</p>
            <p>Price: {unitPrice} {props.service.priceUnit}</p>
            {props.service.showQuantity && totalPriceElements}

            <br />
            {statusMessage}
        </div>
    );
}

/**
 * When a user is logged in, it will display a list of cards of the services,
 * in-house and external, they have requested.
 */
class ViewRequestedServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
            user: props.user,
            inHouse: props.inHouseServices,
            external: props.externalServices
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

        const inhouseRequests = this.state.user.inhouseRequests;
        const externalRequests = this.state.user.externalRequests;

        const inhouseList = inhouseRequests.map(req => {
            let service = this.state.inHouse.find(s=> {
                return (s.id === req.id);
            });

            return <InHouseRequestCard key={req.id} service={service} request={req} />;
        });

        const externalList = externalRequests.map(req => {
            let service = this.state.external.find(s=> {
                return (s.id === req.id);
            });

            return <ExternalRequestCard key={req.id} service={service} request={req} />;
        });

        const noInhouseRequests = <p>You do not currently have any requests for in-house services.</p>;
        const noExternalRequests = <p>You do not currently have any requests for external services.</p>;

        return (
            <main>
                <h1 className="header-indent">Your Requests</h1>
                <h2 className="header-indent">In-House Requests</h2>
                <div className="card-container-layout">
                    {inhouseList.length > 0 ? inhouseList : noInhouseRequests}
                </div>
                <h2 className="header-indent">External Requests</h2>
                <div className="card-container-layout">
                    {externalList.length > 0 ? externalList : noExternalRequests}
                </div>
            </main>
        )
    }

}

export default ViewRequestedServices;