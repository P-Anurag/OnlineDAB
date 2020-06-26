import React, { Component } from "react";
import "./signinForm.css";
import { Redirect } from "react-router-dom";

class SignInForm extends Component {
  state = {
    userType: this.props.userType,
    userName: this.props.userType + "_userName",
    userPass: this.props.userType + "_userPass",
    signinSubmit: this.props.userType + "_signinSubmit",
    redirectPath: "",
    redirect: false,
  };

  handleuserNameChange = (name) => {
    this.setState({ userNameVal: name.target.value });
  };
  handlePassChange = (pass) => {
    this.setState({ userPassVal: pass.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let requestPath;
    switch (this.state.userType) {
      case "doctor":
        requestPath = "/loginDoc";
        break;
      case "patient":
        requestPath = "/loginPatient";
        break;
      case "admin":
        requestPath = "/loginAdmin";
        break;
      default:
    }

    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usrname: this.state.userNameVal,
        password: this.state.userPassVal,
      }),
    };

    fetch(`http://localhost:3001${requestPath}`, load)
      .then((response) => response.json())
      .then((user) => {
        if (user === "Network error") {
          this.setState({
            errorMsg: user + ". Not able to connect to database",
          });
        } else if (user.EMAIL !== this.state.userNameVal) {
          // console.log("Wrong credentials.");
          this.setState({ errorMsg: "Wrong: Credentials!" });
        } else if (user.EMAIL === this.state.userNameVal) {
          this.setState({
            redirectPath: `/${this.state.userType}`,
            redirect: true,
          });
          // console.log("Sign in frm", user);
          this.props.handleLoadUser(this.state.userType, user);
          this.props.setIsSignedIn(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    document.getElementById(`${this.state.userType}_signInFrm`).reset();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectPath} />;
    }
    return (
      <form
        id={`${this.state.userType}_signInFrm`}
        onSubmit={this.handleSubmit}
      >
        <div>
          <label>Username :</label>
          <input
            id={this.state.userName}
            type="email"
            placeholder="example@gmail.com"
            onChange={this.handleuserNameChange}
          />
          <br />
        </div>
        <div>
          <label>Password :</label>
          <input
            id={this.userPass}
            type="password"
            onChange={this.handlePassChange}
          />
        </div>

        <div>
          <input
            id={this.signinSubmit}
            className="signinSubmit"
            value="Log In"
            type="submit"
          />
        </div>
        <p className="error">{this.state.errorMsg}</p>
      </form>
    );
  }
}

export default SignInForm;
