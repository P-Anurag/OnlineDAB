import React, { Component } from "react";
import "./signinForm.css";
//Input: name, password, specialization, regNo, location

class RegFormDoc extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    number: "",
    specialization: "",
    regNo: "",
    location: "",
  };

  handleNameChange = (name) => {
    this.setState({ name: name.target.value });
  };
  handlePassChange = (pass) => {
    this.setState({ password: pass.target.value });
  };
  handleEmailChange = (email) => {
    this.setState({ email: email.target.value });
  };
  handleNumberChange = (number) => {
    this.setState({ number: number.target.value });
  };
  handleSplChange = (specialization) => {
    this.setState({ specialization: specialization.target.value });
  };
  handleRgNoChange = (regNo) => {
    this.setState({ regNo: regNo.target.value });
  };
  handleLocChange = (location) => {
    this.setState({ location: location.target.value });
  };

  handleRegDoc = (event) => {
    event.preventDefault();
    // name, email, number, password, specialization, regNo, location
    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        number: this.state.number,
        password: this.state.password,
        specialization: this.state.specialization,
        regNo: this.state.regNo,
        location: this.state.location,
      }),
    };
    // console.log(load);
    fetch("http://localhost:3001/registerDoc", load)
      .then((response) => response.json())
      .then((doc) => {
        if (doc.NAME === this.state.name) {
          alert(
            "Registered Successfully,\nOur Admin will verify your account soon.\nThank You!"
          );
        } else {
          alert(
            "Sorry, There was a problem,\nThis might be bacause of duplicate email!"
          );
        }
      })
      .catch((e) => console.log(e));
    document.getElementById("docRegForm").reset();
  };
  render() {
    return (
      <form id="docRegForm" onSubmit={this.handleRegDoc}>
        <div>
          <label>Name* :</label>
          <br />
          <input
            onChange={this.handleNameChange}
            id="docName"
            name="docName"
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
            id="docPass"
            type="password"
            name="docPass"
            placeholder="New Pass"
          />
          <br />
        </div>
        <div>
          <label>Email(Will be used as username)* :</label>
          <br />
          <input
            onChange={this.handleEmailChange}
            id="docEmail"
            type="email"
            name="docEmail"
            placeholder="example@gmail.com"
          />
          <br />
        </div>
        <div>
          <label>Phone Number* :</label>
          <br />
          <input
            onChange={this.handleNumberChange}
            id="docNumber"
            type="number"
            name="docNumber"
            placeholder="Phone Number"
          />
          <br />
        </div>
        <div>
          <label>Speccialization* :</label>
          <br />
          <input
            onChange={this.handleSplChange}
            id="docSpl"
            name="docSpl"
            type="text"
            placeholder="Enter specialization"
          />
          <br />
        </div>
        <div>
          <label>Reg No.* :</label>
          <br />
          <input
            onChange={this.handleRgNoChange}
            id="docRegNo"
            name="docRegNo"
            type="text"
            placeholder="Register No"
          />
          <br />
        </div>
        <div>
          <label>Location* :</label>
          <input
            onChange={this.handleLocChange}
            id="docLoc"
            name="docLoc"
            type="text"
            placeholder="Enter ur Locality"
          />
          <br />
        </div>
        <div>
          <button
            id="regDocSubmit"
            className="signinSubmit"
            type="submit"
            // onClick={this.handleRegDoc}
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default RegFormDoc;
