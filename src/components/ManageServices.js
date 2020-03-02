import React, { Component } from 'react';


/**
 * Creates a card element for this pending request data.
 * @param {Object} props The data for the pending request.
 */
function PendingRequestCard(props) {
    return(
        <div className="card-container centered-content">
            <h3>{props.req.title}</h3>
            <button>View Details</button>
            <br />
            <br />
            <button>Reject Request</button>
            <button className="confirm-button">Approve Request</button>
        </div>
    );
}

/**
 * Creates a table element for this service's data.
 * @param {Object} props The data for the service.
 */
function ServiceTable(props) {
    const keys = Object.keys(props.service);
    let headerRow = [];
    let dataRow = [];
    keys.forEach(key => {
        headerRow.push(<th>{key}</th>);
        let value = props.service[key];
        let isReadOnly;
        props.isReadOnly ? isReadOnly="readonly" : isReadOnly="";
        dataRow.push(<td><input type="text" value={value} readOnly={isReadOnly}/></td>);

    });

    return(
        <div className="card-container make-scrollable">
            <h3>Service Type: {props.type}</h3>
            <br />
            <table>
                <tr>
                    {headerRow}
                </tr>
                <tr>
                    {dataRow}
                </tr>
            </table>
            <br />
            <button>Modify Service</button>
            <button>Delete Service</button>
        </div>
    );
}

/**
 * Contains the rendering and logic components to display a list of pending
 * request cards and services in a table format.
 */
class ManageServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            inHouse: props.inHouse,
            external: props.external
        }
    }

    render() {
        const pendingRequests = this.state.inHouse.map(req => <PendingRequestCard key={req.id} req={req} />);
        const classes = this.state.classes.map(c => <ServiceTable key={c.id} service={c} isReadOnly={true} type="Class"/>);
        const inHouses = this.state.inHouse.map(s => <ServiceTable key={s.id} service={s} isReadOnly={true} type="In-House"/>);
        const externals = this.state.external.map(s => <ServiceTable key={s.id} service={s} isReadOnly={true} type="External"/>);
        return (
            <main >
                <h1 className="header-indent">Manage Services</h1>
                <h2 className="header-indent">Pending Requests</h2>
                <div className="card-container-layout">
                    {pendingRequests}
                </div>
                <button className="confirm-button heading-button">Add New Service</button>
                <h2 className="header-indent">Existing Services</h2>
                <div className="table-container">
                    {classes}
                    {inHouses}
                    {externals}
                </div>
            </main>

        )
    }
}

export default ManageServices;