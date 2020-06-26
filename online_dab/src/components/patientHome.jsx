import React, { Component } from "react";
import Taskbar from "./taskbar";
import PatHomeTable from "./patientHomeTable";
import ProfileDisplayModal from "./profileDispMdl";
import "./patientHome.css";

import BookModal from "./bookModal";
class PatientHome extends Component {
  state = {
    validDocList: [],
    appointments: [],
    tableData: [],
    feedBackDocList: [],
    dispBookMdl: false,
    appDocInfo: {},
    tableHeading: "Available Doctors",
    emptyListMsg: "",
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    fetch("http://localhost:3001/patient/getDoctor")
      .then((response) => response.json())
      .then((docs) => {
        if (docs === "NO" && this._isMounted) {
          this.setState({
            emptyListMsg: "We are sorry no valid doctor registered yet...",
            tableData: [],
          });
        } else if (this._isMounted)
          this.setState({
            validDocList: docs,
            tableData: docs,
            emptyListMsg: "",
          });
      })
      .catch((e) => console.log(e));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleFilteredDocs = (filteredDocList) => {
    this.setState({ tableData: filteredDocList });
  };

  setAppDocInfo = (doc) => {
    this.setState({ appDocInfo: doc, dispBookMdl: true });
  };

  hideModal = () => {
    this.setState({ dispBookMdl: false });
  };

  getValidDocs = (heading) => {
    this.setState({
      tableHeading: heading,
      tableData: this.state.validDocList,
      emptyListMsg: "",
    });
  };
  getAppointments = (heading) => {
    // console.log(this.state.appointments);
    if (this.state.appointments.length) {
      this.setState({
        tableHeading: heading,
        tableData: this.state.appointments,
        emptyListMsg: "",
      });
    } else {
      let patient = this.props.patient;
      fetch(
        `http://localhost:3001/patient/getAppointments/${patient.PATIENT_ID}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              emptyListMsg:
                "You have no appiontments or ur booking has been canceled since doc was busy",
              tableData: [],
            });
          } else if (this._isMounted)
            this.setState({
              tableHeading: heading,
              tableData: res,
              appointments: res,
              emptyListMsg: "",
            });
        });
    }
  };

  getFeedbackDocList = (heading) => {
    if (this.state.feedBackDocList.length) {
      this.setState({
        tableHeading: heading,
        tableData: this.state.feedBackDocList,
        emptyListMsg: "",
      });
    } else {
      let patient = this.props.patient;
      fetch(
        `http://localhost:3001/patient/getFeedBackDocList/${patient.PATIENT_ID}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              emptyListMsg:
                "You must be treated by a doctor in order to give feedback...",
              tableData: [],
            });
          } else if (this._isMounted)
            this.setState({
              tableHeading: heading,
              tableData: res,
              appointments: res,
              emptyListMsg: "",
            });
        });
    }
  };

  handleGiveFeedback = (i, d_id, r) => {
    // console.log("Feedback Sent :", r);
    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doc_id: d_id,
        pat_id: this.props.patient.PATIENT_ID,
        remark: r,
      }),
    };
    fetch("http://localhost:3001/patient/giveFeedback", load)
      .then((res) => res.json())
      .then((res) => {
        if (res === "SUCCESSFUL") {
          let feedBackList = [...this.state.feedBackDocList];
          feedBackList.splice(i, 1);
          this.setState({
            feedBackDocList: feedBackList,
            tableData: feedBackList,
          });
        }
      });
  };

  render() {
    let profileModal = null,
      bookModal = null;
    if (this.state.dispBookMdl) {
      bookModal = (
        <BookModal doc={this.state.appDocInfo} hideMdl={this.hideModal} />
      );
    } else {
      bookModal = null;
    }

    if (this.props.showProf) {
      profileModal = (
        <ProfileDisplayModal
          userInfo={this.props.patient}
          showProfile={this.props.showProfile}
        />
      );
    } else {
      profileModal = null;
    }
    return (
      <div>
        {sessionStorage.getItem("user") &&
        sessionStorage.getItem("userType") === "patient" ? (
          <div className="content">
            <div className="taskbarDiv">
              <Taskbar
                user={this.props.user}
                handleFilter={this.handleFilteredDocs}
                getAppointments={this.getAppointments}
                getValidDocs={this.getValidDocs}
                getFeedbackDocList={this.getFeedbackDocList}
              />
            </div>
            <div className="tableDiv">
              <h1>{this.state.tableHeading}</h1>
              <PatHomeTable
                setAppDocInfo={this.setAppDocInfo}
                data={this.state.tableData}
                user={this.props.user}
                tableHead={this.state.tableHeading}
                handleGiveFeedback={this.handleGiveFeedback}
              />
              <p>{this.state.emptyListMsg}</p>
            </div>
            {bookModal}
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

export default PatientHome;
