import React, { Component } from "react";
import "./signinForm.css";

// NAME: name,
// GENDER: gender,
// DOB: dob,
// EMAIL: email,
// PHONE_NUMBER: phone,
// MARITAL_STATUS: marital_status,
// ADDRESS: address
// PASSWORD: password,

class RegFormPat extends Component {
  // { name, password, gender, dob, email, phone, marital_status, address }

  state = {
    name: "",
    password: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    marital_status: "",
    address: "",
  };

  handleNameChange = (name) => {
    this.setState({ name: name.target.value });
  };
  handlePassChange = (password) => {
    this.setState({ password: password.target.value });
  };
  handleGenChange = (gender) => {
    this.setState({ gender: gender.target.value });
  };
  handleDOBChange = (dob) => {
    this.setState({ dob: dob.target.value });
  };
  handleEmailChange = (email) => {
    this.setState({ email: email.target.value });
  };
  handleNumberChange = (phone) => {
    this.setState({ phone: phone.target.value });
  };
  handleMSChange = (marital_status) => {
    this.setState({ marital_status: marital_status.target.value });
  };
  handleAddressChange = (address) => {
    this.setState({ address: address.target.value });
  };

  handleRegPat = (event) => {
    // console.log(this.state);

    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        gender: this.state.gender,
        dob: this.state.dob,
        email: this.state.email,
        phone: this.state.phone,
        marital_status: this.state.marital_status,
        address: this.state.address,
      }),
    };
    fetch("http://localhost:3001/registerPatient", load)
      .then((response) => response.json())
      .then((pat) => {
        if (pat.NAME === this.state.name) {
          alert("Registered successfully\nThank You!");
        } else {
          alert("Sorry, there was a problem, please try again.\n" + pat);
        }
      });
    // .catch((e) => console.log(e));
    document.getElementById("patRegForm").reset();
    event.preventDefault();
  };

  render() {
    return (
      <form id="patRegForm" onSubmit={this.handleRegPat}>
        <div>
          <label>Name* :</label>
          <br />
          <input
            onChange={this.handleNameChange}
            id="patName"
            name="patName"
            type="text"
            placeholder="Enter name"
          />
          <br />
        </div>
        <div>
          <label>Password* :</label>
          <br />
          <input
            onChange={this.handlePassChange}
            id="patPass"
            type="password"
            name="patPass"
            placeholder="New Pass"
          />
          <br />
        </div>
        <div>
          <label>Email(Will be used as username)* :</label>
          <br />
          <input
            onChange={this.handleEmailChange}
            id="patEmail"
            type="email"
            name="patEmail"
            placeholder="example@gmail.com"
          />
          <br />
        </div>
        <div>
          <label>Gender* :</label>
          <br />
          <input
            onChange={this.handleGenChange}
            name="patGender"
            type="radio"
            value="Male"
            id="Male"
          />
          Male
          <input
            onChange={this.handleGenChange}
            name="patGender"
            type="radio"
            value="Female"
            id="Female"
          />
          Female
          <input
            onChange={this.handleGenChange}
            name="patGender"
            type="radio"
            value="Others"
            id="Others"
          />
          Others
          <br />
        </div>
        <div>
          <label>DOB* :</label>
          <br />
          <input
            onChange={this.handleDOBChange}
            id="patDOB"
            type="date"
            name="patDOB"
            placeholder="MM-DD-YYYY"
          />
          <br />
        </div>
        <div>
          <label>Marital Status* :</label>
          <br />
          <input
            onChange={this.handleMSChange}
            name="userMaritalSts"
            type="radio"
            value="Married"
            id="Married"
          />
          Married
          <br />
          <input
            onChange={this.handleMSChange}
            name="userMaritalSts"
            type="radio"
            value="Single"
            id="Single"
          />
          Single
          <br />
          <input
            onChange={this.handleMSChange}
            name="userMaritalSts"
            type="radio"
            value="NA"
            id="NA"
          />
          Don't want to disclose
          <br />
        </div>
        <div>
          <label>Phone Number* :</label>
          <input
            onChange={this.handleNumberChange}
            id="patNumber"
            type="number"
            name="patNumber"
            placeholder="Phone number"
          />
          <br />
        </div>
        <div>
          <label>Address* :</label>
          <br />
          <input
            onChange={this.handleAddressChange}
            id="patAddress"
            name="patAddress"
            type="textarea"
            placeholder="Enter Address"
          />
          <br />
        </div>

        <div>
          <button
            // onClick={this.handleRegPat}
            id="regPatSubmit"
            className="signinSubmit"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default RegFormPat;
