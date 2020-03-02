import React, { Component } from 'react';
import ClassCard from './ClassCard.js'
import InHouseCard from './InHouseServiceCard.js'
import ExternalCard from './ExternalServiceCard.js'

/**
 * Contains the rendering elements to display a list of cards for all classes,
 * in-house services, and external services offered by the organization.
 */
class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
            classes: props.classes,
            inHouse: props.inHouse,
            external: props.external
        }
    }

    render() {
        const classes = this.state.classes.map(course => <ClassCard key={course.id} class={course} isLoggedIn={this.state.isLoggedIn} />);
        const inHouses = this.state.inHouse.map(serv => <InHouseCard key={serv.id} service={serv} isLoggedIn={this.state.isLoggedIn} />);
        const externals = this.state.external.map(serv => <ExternalCard key={serv.id} service={serv} isLoggedIn={this.state.isLoggedIn} />);
        return (
            <main >
                <h1 className="header-indent">Our Services</h1>
                <h2 className="header-indent">Classes</h2>
                <div className="card-container-layout">
                    {classes}
                </div>
                <h2 className="header-indent">Other In-House Services</h2>
                <div className="card-container-layout">
                   {inHouses}
                </div>
                <h2 className="header-indent">External Services</h2>
                <div className="card-container-layout">
                    {externals}
                </div>
            </main>
        )
    }
}

export default Services;