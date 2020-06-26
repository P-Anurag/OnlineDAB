import React, { Component } from "react";
import "./tableDoc.css";

class PatHomeTable extends Component {
  state = {};
  render() {
    let tableHead, tableContent;
    if (this.props.tableHead === "Available Doctors") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>DOCTOR NAME</th>
          <th>SPECIALIZATION</th>
          <th>LOCALITY</th>
          <th>PHONE NUMBER</th>
          <th>BOOK APPOINTMENT</th>
        </tr>
      );
      tableContent = this.props.data.map((d, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{d.NAME.toUpperCase()}</td>
          <td>{d.SPECIALIZATION.toUpperCase()}</td>
          <td>{d.LOCATION.toUpperCase()}</td>
          <td>{d.PHONE_NUMBER}</td>
          <td style={{ textAlign: "center" }} className="book">
            <button onClick={() => this.props.setAppDocInfo(d)} id={d.DOC_ID}>
              Book Appointment
            </button>
          </td>
        </tr>
      ));
    } else if (this.props.tableHead === "My Appointments") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>DOCTOR NAME</th>
          <th>SPECIALIZATION</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>PHONE NUMBER</th>
        </tr>
      );
      tableContent = this.props.data.map((d, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{d.NAME.toUpperCase()}</td>
          <td>{d.SPECIALIZATION.toUpperCase()}</td>
          <td>{d.DATE}</td>
          <td>{d.TIME}</td>
          <td>{d.PHONE_NUMBER}</td>
        </tr>
      ));
    } else if (this.props.tableHead === "Give Feedback") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>FEEDBACK</th>
        </tr>
      );
      tableContent = this.props.data.map((d, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>
            <div className="feedbackCard confirm">
              {d.NAME.toUpperCase()} &nbsp;&nbsp;&nbsp;{" "}
              {d.SPECIALIZATION.toUpperCase()}
              <br />
              <textarea id="remark" rows="3"></textarea>
              <br />
              <div style={{ textAlign: "right" }}>
                <button
                  style={{
                    textAlign: "center",
                    padding: "0.4em",
                    width: "18ex",
                  }}
                  id={"feedback_" + d.DOC_ID}
                  onClick={() => {
                    let remark = document.getElementById("remark").value;
                    this.props.handleGiveFeedback(i, d.DOC_ID, remark);
                  }}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </td>
        </tr>
      ));
    }
    return (
      <div>
        <table>
          <tbody>
            {tableHead}
            {tableContent}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PatHomeTable;
