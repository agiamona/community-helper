import React from 'react';

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
            <a className="heading-button" href="/manager-account/manage-services">Manage Services</a>
            <a className="heading-button" href="/manager-account/manage-employees">Manage Employees</a>
            <a className="heading-button" href="/manager-account/manage-volunteers">Manage Volunteers</a>
        </main>
    )
    
}

export default ManagerAccount;