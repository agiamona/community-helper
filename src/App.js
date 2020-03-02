import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/header-footer.css';
import './styles/style.css';
import './styles/landing.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Account from './components/Account.js';
import NotFound from './components/NotFound.js';
import Services from './components/Services.js';
import Donate from './components/Donate.js';
import ViewEnrolledClasses from './components/ViewEnrolledClasses.js';
import ViewRequestedServices from './components/ViewRequestedServices.js';
import ManagerAccount from './components/ManagerAccount.js';
import ManageServices from './components/ManageServices.js';
import ManageEmployees from './components/ManageEmployees.js';
import ManageVolunteers from './components/ManageVolunteers.js';
import VolunteerAccount from './components/VolunteerAccount.js';

import usersData from './data/usersData.js';
import employeesData from './data/employeesData.js';
import volunteersData from './data/volunteersData.js';
import classesData from './data/classesData.js';
import inHouseServicesData from './data/inHouseServicesData.js';
import externalServicesData from './data/externalServicesData.js';


/**
 * Contains the routing for the application and assemblies the set of components
 * to display (i.e. The Header, the content, Footer), and maintains the
 * state of the entire program.
 */
class App extends Component {
  constructor() {
    super();

    if(sessionStorage.getItem("loggedIn") === null) {
      sessionStorage.setItem("loggedIn", "");
    }

    this.state = {
      loggedIn: sessionStorage.getItem("loggedIn"),
      users: usersData,
      classes: classesData,
      inHouseServices: inHouseServicesData,
      externalServices: externalServicesData,
      employees: employeesData,
      volunteers: volunteersData
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  /**
   * Saves the state that the user with the specified username is logged in.
   * @param {String} username The logged in user's unique username
   */
  handleLogIn(username) {
    sessionStorage.setItem("loggedIn", username);
    this.setState({
      loggedIn: username
    });
  }

  /**
   * Logs out the logged in user by setting all logged in related values to default.
   */
  handleLogOut() {
    sessionStorage.setItem("loggedIn", "");
    this.setState({
      loggedIn: ""
    });
  }

  render() {
    let username = this.state.loggedIn;
    let user = this.state.users.find(usr => {
      return (usr.username === username);
    });

    return (
      <div id="content-container">
        <Header isLoggedIn={this.state.loggedIn !== ""} handleLogOut={this.handleLogOut}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account"
            render={(props) => 
              <Account {...props} user={user} isLoggedIn={this.state.loggedIn !== ""} 
            />}
          />
          <Route exact path="/account/enrolled-classes" render={(props) => 
              <ViewEnrolledClasses 
                {...props} 
                user={user} 
                classes={this.state.classes} 
                isLoggedIn={this.state.loggedIn !== ""} 
            />}
          />
          <Route exact path="/account/requested-services" render={(props) =>          
              <ViewRequestedServices 
                    {...props} 
                    user={user} 
                    inHouseServices={this.state.inHouseServices}
                    externalServices={this.state.externalServices} 
                    isLoggedIn={this.state.loggedIn !== ""} 
                />}
            />
          <Route exact path="/donate" 
            render={(props) => 
              <Donate {...props} isLoggedIn={this.state.loggedIn !== ""} 
            />}
          />
          <Route exact path="/login" 
            render={(props) => <Login 
                {...props} 
                users={this.state.users}  
                handleLogIn={this.handleLogIn} 
              />
            }
          />
          <Route exact path="/manager-account" component={ManagerAccount} />
          <Route exact path="/manager-account/manage-services" 
            render={(props) => <ManageServices 
                {...props} 
                classes={this.state.classes}  
                inHouse={this.state.inHouseServices}
                external={this.state.externalServices} 
              />
            }
          />
          <Route exact path="/manager-account/manage-employees" 
            render={(props) => <ManageEmployees 
                {...props} 
                employees={this.state.employees}  
              />
            }
          />
          <Route exact path="/manager-account/manage-volunteers" 
            render={(props) => <ManageVolunteers
                {...props} 
                volunteers={this.state.volunteers}  
              />
            }
          />
          <Route exact path="/register" 
            render={(props) => <Register 
              {...props} 
              handleLogIn={this.handleLogIn} 
            />
            }
          />
          <Route exact path="/services" 
            render={(props) => 
              <Services {...props} 
                isLoggedIn={this.state.loggedIn !== ""} 
                classes={this.state.classes}
                inHouse={this.state.inHouseServices}
                external={this.state.externalServices}
            />}
          />
          <Route exact path="/volunteer-account" 
            render={(props) => <VolunteerAccount
                {...props} 
                volunteer={this.state.volunteers[0]}  
              />
            }
          />
          <Route component={NotFound} />
        </Switch>
        <Footer isLoggedIn={this.state.loggedIn !== ""} handleLogOut={this.handleLogOut}/>
      </div>
    )
  }
}

export default App;
