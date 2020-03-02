import React, { Component } from 'react';

/**
 * Creates a table element for this volunteer's data.
 * @param {Object} props The data for this volunteer.
 */
function VolunteerTable(props) {
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
            <table>
                <tr>
                    {headerRow}
                </tr>
                <tr>
                    {dataRow}
                </tr>
            </table>
            <br />
            <button>Modify Volunteer</button>
            <button>Delete Volunteer</button>
        </div>
    );
}

/**
 * Contains the rendering and logic components to display a list of volunteers.
 */
class ManageVolunteers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteers: props.volunteers,
        }
    }

    render() {
        const volunteers = this.state.volunteers.map(e => <VolunteerTable key={e.id} service={e} isReadOnly={true} />);
      return (
            <main >
                <h1 className="header-indent">Manage Volunteer</h1>
                <button className="confirm-button heading-button">Add New Volunteer</button>
                <h2 className="header-indent">Current Volunteer</h2>
                <div className="table-container">
                    {volunteers}
                </div>
            </main>

        )
    }
}

export default ManageVolunteers;