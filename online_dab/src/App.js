import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar';
import SigninTabSel from './components/signInTabSel';
import RegisterTabSel from './components/regTabSel';
import HomePage from './components/homePage';
import PatientHome from './components/patientHome';
import AdminHome from './components/adminHome';
import DoctorHome from './components/doctorHome';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const initialState = {};
class App extends Component {
  state = {
    initialState,
    isSignedIn: sessionStorage.getItem("isSignedIn"),
    userClass: sessionStorage.getItem("userType"),
    userDetails: JSON.parse(sessionStorage.getItem("user")),
    showProf: false
  };
  loadUser = (userType, user) => {
    // console.log("Appp", user)
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("userType", userType);
    // console.log(sessionStorage.getItem("user"));

    this.setState({ userClass: userType, userDetails: user })
  }

  setIsSignedIn = (bool) => {
    sessionStorage.setItem("isSignedIn", bool)
    this.setState({ isSignedIn: sessionStorage.getItem("isSignedIn") })

  }

  showProfile = (val) => {
    this.setState({ showProf: val })
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar setIsSignedIn={this.setIsSignedIn} showProfile={this.showProfile} />
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path="/signinTabSel" exact component={() => <SigninTabSel handleLoadUser={this.loadUser} setIsSignedIn={this.setIsSignedIn} />} />
            <Route path="/regTabSel" exact component={() => <RegisterTabSel />} />
            <Route path="/patient" component={() => <PatientHome user="patient" patient={this.state.userDetails} showProf={this.state.showProf} showProfile={this.showProfile} />} />
            <Route path="/admin" component={() => <AdminHome user="admin" admin={this.state.userDetails} showProf={this.state.showProf} showProfile={this.showProfile} />} />
            <Route path="/doctor" component={() => <DoctorHome user="doctor" doctor={this.state.userDetails} showProf={this.state.showProf} showProfile={this.showProfile} />} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
