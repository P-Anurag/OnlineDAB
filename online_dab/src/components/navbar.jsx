import React, { Component } from "react";
import "./navbar.css";
import Logo from "./photos/logo.png";
import { Link } from "react-router-dom";
import SignOutBtn from "./signOutBtn";

class Navbar extends Component {
  expandMenuBar = () => {
    document
      .getElementsByClassName("sideMenu")[0]
      .classList.toggle("sideMenuDisplay");
    document
      .getElementsByClassName("sideMenu")[0]
      .classList.toggle("sideMenuDisp");

    document.getElementById("4").classList.toggle("one");
    document.getElementById("5").classList.toggle("two");
    document.getElementById("6").classList.toggle("three");
  };

  closeSideMenu = () => {
    document
      .getElementsByClassName("sideMenu")[0]
      .classList.toggle("sideMenuDisplay");
    document
      .getElementsByClassName("sideMenu")[0]
      .classList.toggle("sideMenuDisp");

    document.getElementById("4").classList.toggle("one");
    document.getElementById("5").classList.toggle("two");
    document.getElementById("6").classList.toggle("three");
  };
  state = {};
  render() {
    // console.log("Navbar :", this.props.isSignedIn);
    return (
      <div className="navbar">
        <div className="logo">
          <img src={Logo} alt="logo" style={{ height: "5em", width: "auto" }} />
        </div>
        <div className="hamburger" onClick={this.expandMenuBar}>
          <span id="4"></span>
          <span id="5"></span>
          <span id="6"></span>
        </div>
        <div className="links">
          {sessionStorage.getItem("isSignedIn") ? (
            <div>
              <button onClick={() => this.props.showProfile(true)}>ME</button>
              <SignOutBtn setIsSignedIn={this.props.setIsSignedIn} />
            </div>
          ) : (
            <div>
              <Link to="/">
                <button>Home</button>
              </Link>
              <Link to="/signinTabSel">
                <button>Sign In</button>
              </Link>
              <Link to="/regTabSel">
                <button>Register</button>
              </Link>
            </div>
          )}
        </div>

        <div className="sideMenu sideMenuDisplay">
          {/* <br /> */}
          {sessionStorage.getItem("isSignedIn") ? (
            <div>
              <button>ME</button>
              <SignOutBtn setIsSignedIn={this.props.setIsSignedIn} />
            </div>
          ) : (
            <div>
              <Link to="/">
                <button onClick={this.closeSideMenu}>Home</button>
              </Link>
              <Link to="/signinTabSel">
                <button onClick={this.closeSideMenu}>Sign In</button>
              </Link>
              <br />
              <Link to="/regTabSel">
                <button onClick={this.closeSideMenu}>Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
