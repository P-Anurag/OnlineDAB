import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignOutBtn extends Component {
  handleSignOut = () => {
    this.props.setIsSignedIn(false);
    sessionStorage.clear();
  };

  state = {};
  render() {
    return (
      <Link to="/">
        <button onClick={this.handleSignOut}>Sign Out</button>
      </Link>
    );
  }
}

export default SignOutBtn;
