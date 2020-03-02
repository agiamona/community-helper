import React, { Component } from 'react';

/**
 * Displays the information for a service the volunteer is assigned to.
 */
function AssignmentCard(props) {
    return(
        <div className="card-container centered-content">
            <h3>{props.assignment}</h3>
            <button>View Details</button>
        </div>
    );
}


/**
 * contains the rendering elements for a volunteer's account page.
 */
class VolunteerAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteer: props.volunteer
        }
    }

    render() {
        const assignments = this.state.volunteer.assignments.map(s => <AssignmentCard key={s} assignment={s} />);
        return (
            <main>
                <h1 className="header-indent">Volunteering Assignments</h1>
                <h2 className="header-indent">{this.state.volunteer.name}, you have been assigned to the following services:</h2>
                <div className="card-container-layout">
                    {assignments}
                </div>
              </main>

        )
    }
}

export default VolunteerAccount;