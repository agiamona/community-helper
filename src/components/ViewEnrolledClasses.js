import React, { Component } from 'react';

/**
 * Displays in a card format, the details of a class the user has enrolled in, 
 * and the status of their enrollment.
 * @param {Object} props The data for this class.
 */
function EnrollmentCard(props) {
    const price = (props.class.price === 0.00 ? "Free" : "$" + props.class.price);
    const statusMessage = props.dropped ? <p className="login-message">Dropped!</p>
                                    : <p className="request-submitted">Enrolled!</p>

    return (
        <div className="card-container">
            <h3>{props.class.title}</h3>
            <p>Price: {price}</p>
            <p>{props.class.description}</p>
            <p>Start Date: {props.class.startDate}</p>
            <p>Class Meetings: {props.class.meetings}</p>
            <br />
            {statusMessage}
        </div>
    );
}

/**
 * When a user is logged in, it will display a list of cards of the courses
 * they have enrolled in.
 */
class ViewEnrolledClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
            user: props.user,
            classes: props.classes
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

        const enrolledClasses = this.state.user.enrollments;
        const classData = enrolledClasses.map(enrollment => {
            let id = enrollment.id;
            let course = this.state.classes.find(c=> {
                return (c.id === id);
            });

            return {
                id: enrollment.id, 
                class: course, 
                dropped: enrollment.dropped
            };
        });
        let enrollmentCards;
        if (enrolledClasses.length === 0) {
            enrollmentCards = <p>You are not currently enrolled in any courses.</p>
        }else {
            enrollmentCards = classData.map(c => <EnrollmentCard key={c.id} class={c.class} dropped={c.dropped} />);
        }
        return (
            <main>
                <h1 className="header-indent">Your Enrolled Classes</h1>
                <div className="card-container-layout">
                    {enrollmentCards}
                </div>
            </main>
        )
    }

}

export default ViewEnrolledClasses;