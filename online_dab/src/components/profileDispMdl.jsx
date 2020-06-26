import React, { Component } from "react";
import "./profileDispMdl.css";

class ProfileDisplayModal extends Component {
  state = {};
  render() {
    let keyVals = Object.entries(this.props.userInfo);
    return (
      <div id="profBg">
        <div id="profCnt">
          <h2>
            <u>Profile</u>
          </h2>

          {keyVals.map((entry, i) => (
            <div key={"lab" + i}>
              <b>{entry[0]} :</b> {entry[1]}
              <br />
            </div>
          ))}
          <button onClick={() => this.props.showProfile(false)}>OK</button>
        </div>
      </div>
    );
  }
}

export default ProfileDisplayModal;
