import React, { Component } from "react";
import Taskbar from "./taskbar";
import TableDoc from "./tableDoc";
import ProfileDisplayModal from "./profileDispMdl";

import "./patientHome.css";

class AdminHome extends Component {
  _isMounted = false;
  state = {
    regDocs: [],
    allDocs: [],
    validDoc: [],
    DocList: [],
    tableHeading: "Registered Doctors",
  };

  componentDidMount() {
    this._isMounted = true;

    fetch("http://localhost:3001/admin/getRegisterDocs")
      .then((response) => response.json())
      .then((docs) => {
        if (docs === "NO" && this._isMounted) {
          this.setState({
            emptyListMsg: "No doctors registered Yet...",
            DocList: [],
          });
        } else if (docs.length && this._isMounted)
          this.setState({
            DocList: docs,
            regDocs: docs,
            emptyListMsg: "",
          });
      })
      .catch((e) => console.log(e));
  }

  handleGetValidDocs = (heading) => {
    if (this.state.validDoc.length) {
      this.setState({ tableHeading: heading, DocList: this.state.validDoc });
    } else {
      fetch("http://localhost:3001/admin/getValidDocs")
        .then((response) => response.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              tableHeading: heading,
              emptyListMsg: "No Valid doctors yet...",
              DocList: [],
            });
          } else if (res.length && this._isMounted)
            this.setState({
              tableHeading: heading,
              validDoc: res,
              DocList: res,
              emptyListMsg: "",
            });
        });
    }
  };

  handleGetAllDocs = (heading) => {
    if (this.state.allDocs.length) {
      // console.log(this.state.allDocs);
      this.setState({ tableHeading: heading, DocList: this.state.allDocs });
    } else {
      fetch("http://localhost:3001/admin/getAllDocs")
        .then((response) => response.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              tableHeading: heading,

              emptyListMsg: "No doctors registered yet...",
              tableData: [],
            });
          } else if (this._isMounted)
            this.setState({
              tableHeading: heading,
              allDocs: res,
              DocList: res,
              emptyListMsg: "",
            });
        });
    }
  };

  handleGetRegDocs = (heading) => {
    this.setState({ tableHeading: heading, DocList: this.state.regDocs });
  };

  handleValid = (id, i) => {
    console.log("Valid: ", id);
    fetch(`http://localhost:3001/admin/validDoc/${id}`);
    // window.location.reload();
    let DocList = [...this.state.DocList];
    DocList.splice(i, 1);
    this.setState({ DocList });
  };

  handleInvalid = (id, i) => {
    console.log("Valid: ", id);
    fetch(`http://localhost:3001/admin/invalidDoc/${id}`, { method: "delete" });
    let DocList = [...this.state.DocList];
    DocList.splice(i, 1);
    this.setState({ DocList });
  };

  handleFilteredDocs = (filteredDocList) => {
    this.setState({ DocList: filteredDocList });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let profileModal = null;
    if (this.props.showProf) {
      profileModal = (
        <ProfileDisplayModal
          userInfo={this.props.admin}
          showProfile={this.props.showProfile}
        />
      );
    } else {
      profileModal = null;
    }
    return (
      <div>
        {sessionStorage.getItem("user") &&
        sessionStorage.getItem("userType") === "admin" ? (
          <div className="content">
            <div className="taskbarDiv">
              <Taskbar
                user={this.props.user}
                handleFilter={this.handleFilteredDocs}
                tabHead={this.state.tableHeading}
                handleGetValidDocs={this.handleGetValidDocs}
                handleGetAllDocs={this.handleGetAllDocs}
                handleGetRegDocs={this.handleGetRegDocs}
              />
            </div>
            <div className="tableDiv">
              <h1>{this.state.tableHeading}</h1>
              <TableDoc
                user={this.props.user}
                tabHead={this.state.tableHeading}
                doctor={this.state.DocList}
                handleValid={this.handleValid}
                handleInvalid={this.handleInvalid}
              />
            </div>
            {profileModal}
          </div>
        ) : (
          <p>
            Sorry this URL is restricted please log in with valid
            credientials...
          </p>
        )}
      </div>
    );
  }
}

export default AdminHome;
