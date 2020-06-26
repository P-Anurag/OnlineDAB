import React, { Component } from "react";
import Taskbar from "./taskbar";
import ProfileDisplayModal from "./profileDispMdl";

import DocHomeTable from "./docHomeTable";

class DoctorHome extends Component {
  state = {
    appList: [],
    confApp: [],
    feedBacks: [],
    history: [],
    tableData: [],
    docDetails: this.props.doctor,
    emptyListMsg: "",
    tableHeading: "New Appointments",
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (this.state.docDetails) {
      fetch(
        `http://localhost:3001/doctor/getAppointments/${this.state.docDetails.DOC_ID}`
      )
        .then((res) => res.json())
        .then((Appointments) => {
          if (Appointments === "NO" && this._isMounted) {
            this.setState({
              emptyListMsg: "You have no new appointments Yet...",
            });
          } else {
            if (this._isMounted) {
              this.setState({
                appList: Appointments,
                tableData: Appointments,
                emptyListMsg: "",
              });
            }
          }
        })
        .catch((e) => console.log(e));
    }
  }

  handleConfirmApp = (a, i) => {
    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doc_id: a.DOC_ID,
        pat_id: a.PATIENT_ID,
        date: a.DATE,
        time_slot: a.TIME,
      }),
    };
    // console.log(load);
    fetch("http://localhost:3001/doctor/confirmAppointment", load)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res === "Confirmed") {
          let appList = [...this.state.appList];
          appList.splice(i, 1);
          this.setState({ appList: appList, tableData: appList });
          alert("Appointment Confirmed");
        } else {
          alert("There was an error...please retry");
        }
      });
  };

  handleCancelApp = (pat, i) => {
    let d_id = this.props.doctor.DOC_ID;
    let p_id = pat.PATIENT_ID;
    let dat = pat.DATE;
    let time = pat.TIME;
    let load = {
      method: "DELETE",
    };
    fetch(
      `http://localhost:3001/doctor/appointments/cancelApp?doc_id=${d_id}&pat_id=${p_id}&date=${dat}&time_slot=${time}`,
      load
    )
      .then((res) => res.json())
      .then((res) => {
        if (res === "Deleted") {
          let appList = [...this.state.appList];
          appList.splice(i, 1);
          this.setState({ appList });
        } else {
        }
      });
  };

  getNewApp = (heading) => {
    this.setState({
      tableHeading: heading,
      tableData: this.state.appList,
      emptyListMsg: "",
    });
  };

  getConfirmedApp = (heading) => {
    let d_id = this.props.doctor.DOC_ID;
    if (this.state.confApp.length) {
      this.setState({
        tableHeading: heading,
        tableData: this.state.confApp,
        emptyListMsg: "",
      });
    } else {
      fetch("http://localhost:3001/doctor/getConfAppointments/" + d_id)
        .then((res) => res.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              tableHeading: heading,
              emptyListMsg: "You have not confirmed any appointments yet...",
            });
          } else if (res.length && this._isMounted) {
            this.setState({
              tableHeading: heading,
              confApp: res,
              tableData: res,
              emptyListMsg: "",
            });
          }
        });
    }
  };

  handleTreated = (a, i) => {
    let load = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doc_id: a.DOC_ID,
        pat_id: a.PATIENT_ID,
        date: a.DATE,
        time_slot: a.TIME,
      }),
    };
    fetch("http://localhost:3001/doctor/treated", load)
      .then((res) => res.json())
      .then((res) => {
        if (res === "Moved to history") {
          let confirmApp = [...this.state.confApp];
          confirmApp.splice(i, 1);
          this.setState({ confApp: confirmApp, tableData: confirmApp });
          alert("Patient Moveed to history");
        } else {
          alert("Try again");
        }
      });
  };

  handleDinCome = (a, i) => {
    let load = {
      method: "DELETE",
    };
    let url = `http://localhost:3001/doctor/missedAppointment?doc_id=${a.DOC_ID}`;
    url += `&pat_id=${a.PATIENT_ID}&date=${a.DATE}&time_slot=${a.TIME}`;
    fetch(url, load)
      .then((res) => res.json())
      .then((res) => {
        if (res === "Deleted") {
          let confirmApp = [...this.state.confApp];
          confirmApp.splice(i, 1);
          this.setState({ confApp: confirmApp, tableData: confirmApp });
          alert("Patient Deleted");
        } else {
          alert("Try again");
        }
      });
  };

  getHistory = (heading) => {
    let d_id = this.props.doctor.DOC_ID;
    if (this.state.history.length) {
      this.setState({
        tableHeading: heading,
        tableData: this.state.history,
        emptyListMsg: "",
      });
    } else {
      fetch("http://localhost:3001/doctor/getHistory/" + d_id)
        .then((res) => res.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              tableHeading: heading,
              emptyListMsg: "No history...",
            });
          } else if (res.length && this._isMounted) {
            this.setState({
              tableHeading: heading,
              history: res,
              tableData: res,
              emptyListMsg: "",
            });
          }
        });
    }
  };

  getFeedBack = (heading) => {
    let d_id = this.props.doctor.DOC_ID;
    if (this.state.feedBacks.length) {
      this.setState({
        tableHeading: heading,
        tableData: this.state.feedBacks,
        emptyListMsg: "",
      });
    } else {
      fetch("http://localhost:3001/doctor/getFeedbacks/" + d_id)
        .then((res) => res.json())
        .then((res) => {
          if (res === "NO" && this._isMounted) {
            this.setState({
              tableHeading: heading,
              emptyListMsg: "No feedbacks yet...",
            });
          } else if (res.length && this._isMounted) {
            // console.log(res);
            this.setState({
              tableHeading: heading,
              tableData: res,
              feedBacks: res,
              emptyListMsg: "",
            });
          }
        });
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    let profileModal = null;
    if (this.props.showProf) {
      profileModal = (
        <ProfileDisplayModal
          userInfo={this.props.doctor}
          showProfile={this.props.showProfile}
        />
      );
    } else {
      profileModal = null;
    }
    return (
      <div>
        {sessionStorage.getItem("user") &&
        sessionStorage.getItem("userType") === "doctor" ? (
          <div className="content">
            <div className="taskbarDiv">
              <Taskbar
                user={this.props.user}
                getNewApp={this.getNewApp}
                getConfirmedApp={this.getConfirmedApp}
                getHistory={this.getHistory}
                getFeedBack={this.getFeedBack}
              />
            </div>
            <div className="tableDiv">
              <h1 id="heading">{this.state.tableHeading}</h1>
              <DocHomeTable
                user={this.props.user}
                tableHeading={this.state.tableHeading}
                tableData={this.state.tableData}
                handleCancelApp={this.handleCancelApp}
                handleConfirmApp={this.handleConfirmApp}
                handleTreated={this.handleTreated}
                handleDinCome={this.handleDinCome}
              />
              <p>{this.state.emptyListMsg}</p>
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

export default DoctorHome;
