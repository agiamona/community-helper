import React, { Component } from 'react';
import servicesList from '../data/servicesList.js';

/**
 * Creates a banner block element with the specified  background image, title,
 * and description.
 * @param {Object} props The object that contains the data for this section.
 */
function SectionBanner(props) {
    const backgroundStyle = {
        backgroundImage: "url(\"" + props.service.image + "\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right", 
        backgroundSize: "contain"
    }
    return (
        <div className="content-card">
            <h3 style={backgroundStyle}>{props.service.title}</h3>
            <p>{props.service.description}</p>
        </div>
    );
}

/**
 * Contains the rendering elements for the home page.
 */
class Home extends Component {
    constructor() {
        super();
        this.state = {
            servicesList: servicesList
        };
    }
    
    render() {
        const cards = this.state.servicesList.map(
                service => <SectionBanner key={service.id} service={service} />);
        return (
            <div className="landing-style">
                <div className="hero-image">
                    <h1>Welcome to Community Helper</h1>
                </div>
                <h2>We provide many services to help those in our community by offering a 
                    wide range of high quality and affordable services!</h2>
                {cards}
            </div>
        );
    }
}

export default Home;