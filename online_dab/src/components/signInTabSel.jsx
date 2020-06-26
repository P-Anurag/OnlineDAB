import React, { Component } from "react";
import "./signInTabSel.css";
import SignInForm from "./signinForm";

class SigninTabSel extends Component {
  componentDidMount() {
    document.getElementById("patient_tab_btn").click();
  }
  openSignIn = (evt, usrType) => {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(usrType).style.display = "block";
    evt.currentTarget.className += " active";
  };

  state = {};
  render() {
    // document.getElementById("Patient").style.display = "block";
    // document.getElementById("patient_tab_btn").className += " active";

    return (
      <div>
        <div className="tab">
          <button
            id="patient_tab_btn"
            className="tablinks"
            onClick={(e) => this.openSignIn(e, "Patient")}
          >
            Patient
          </button>
          <button
            id="doctor_tab_btn"
            className="tablinks"
            onClick={(e) => this.openSignIn(e, "Doctor")}
          >
            Doctor
          </button>
          <button
            id="admin_tab_btn"
            className="tablinks"
            onClick={(e) => this.openSignIn(e, "Admin")}
          >
            Admin
          </button>
        </div>

        <div id="Patient" className="tabcontent">
          <h3>Sign in as Patient</h3>
          <SignInForm
            userType="patient"
            handleLoadUser={this.props.handleLoadUser}
            setIsSignedIn={this.props.setIsSignedIn}
          />
        </div>

        <div id="Doctor" className="tabcontent">
          <h3>Sign in as Doctor</h3>
          <SignInForm
            userType="doctor"
            handleLoadUser={this.props.handleLoadUser}
            setIsSignedIn={this.props.setIsSignedIn}
          />
        </div>

        <div id="Admin" className="tabcontent">
          <h3>Sign in as Admin</h3>
          <SignInForm
            userType="admin"
            handleLoadUser={this.props.handleLoadUser}
            setIsSignedIn={this.props.setIsSignedIn}
          />
        </div>
      </div>
    );
  }
}

export default SigninTabSel;
