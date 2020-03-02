import React, { Component } from 'react';


/**
 * Creates a table element for this employee's data.
 * @param {Object} props The data for the employee.
 */
function EmployeeTable(props) {
    const keys = Object.keys(props.emp);
    let headerRow = [];
    let dataRow = [];
    keys.forEach(key => {
        headerRow.push(<th>{key}</th>);
        let value = props.emp[key];
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
            <button>Modify Employee</button>
            <button>Delete Employee</button>
        </div>
    );
}

/**
 * Contains the rendering and logic components to display a list of employees.
 */
class ManageEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: props.employees,
        }
    }

    render() {
        const employees = this.state.employees.map(e => <EmployeeTable key={e.id} emp={e} isReadOnly={true} />);
      return (
            <main >
                <h1 className="header-indent">Manage Employees</h1>
                <button className="confirm-button heading-button">Add New Employee</button>
                <h2 className="header-indent">Current Employees</h2>
                <div className="table-container">
                    {employees}
                </div>
            </main>

        )
    }
}

export default ManageEmployees;