import React, { Component } from "react";
import "./signInTabSel.css";
import RegFormDoc from "./regFormDoc";
import RegFormPat from "./regFormPat";

class RegisterTabSel extends Component {
  componentDidMount() {
    document.getElementById("reg_patient_tab_btn").click();
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
    return (
      <div>
        <div className="tab">
          <button
            id="reg_patient_tab_btn"
            className="tablinks"
            onClick={(e) => this.openSignIn(e, "Patient_reg")}
          >
            Patient
          </button>
          <button
            id="reg_doctor_tab_btn"
            className="tablinks"
            onClick={(e) => this.openSignIn(e, "Doctor_reg")}
          >
            Doctor
          </button>
        </div>

        <div id="Patient_reg" className="tabcontent">
          <h3>Register as Patient</h3>
          <RegFormPat />
        </div>

        <div id="Doctor_reg" className="tabcontent">
          <h3>Register as Doctor</h3>
          <RegFormDoc />
        </div>
      </div>
    );
  }
}

export default RegisterTabSel;
