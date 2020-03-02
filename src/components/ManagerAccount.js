import React from 'react';
import { Link } from "react-router-dom";

/**
 * Renders the manager's account page with links to other pages to manage the actual
 * resources.
 */
function ManagerAccount() {
    return (
        <main className="centered-content">
            <h2>Manager Account</h2>
            <br />
            <br />

            <Link className="heading-button" to="/manager-account/manage-services">Manage Services</Link>
            <Link className="heading-button" to="/manager-account/manage-employees">Manage Employees</Link>
            <Link className="heading-button" to="/manager-account/manage-volunteers">Manage Volunteers</Link>
        </main>
    )
    
}

export default ManagerAccount;