import React, { Component } from "react";
import "./tableDoc.css";

class DocHomeTable extends Component {
  state = {};

  render() {
    let tableHead, tableContent;
    // console.log(this.props.tableData);
    if (this.props.tableHeading === "New Appointments") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>PATIENT NAME</th>
          <th>PHONE NUMBER</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>CONFIRM</th>
          <th>CANCEL</th>
        </tr>
      );
      tableContent = this.props.tableData.map((a, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{a.PATIENT_NAME.toUpperCase()}</td>
          <td>{a.PHONE_NUMBER}</td>
          <td>{a.DATE}</td>
          <td>{a.TIME}</td>
          <td style={{ textAlign: "center" }} className="confirm">
            <button
              onClick={() => this.props.handleConfirmApp(a, i)}
              id={a.DOC_ID}
            >
              Confirm
            </button>
          </td>
          <td style={{ textAlign: "center" }} className="cancel">
            <button
              onClick={() => this.props.handleCancelApp(a, i)}
              id={a.DOC_ID}
            >
              Cancel
            </button>
          </td>
        </tr>
      ));
    } else if (this.props.tableHeading === "My Appointments") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>PATIENT NAME</th>
          <th>PHONE NUMBER</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>CONFIRM</th>
          <th>CANCEL</th>
        </tr>
      );
      tableContent = this.props.tableData.map((a, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{a.PATIENT_NAME.toUpperCase()}</td>
          <td>{a.PHONE_NUMBER}</td>
          <td>{a.DATE}</td>
          <td>{a.TIME}</td>
          <td style={{ textAlign: "center" }} className="confirm">
            <button
              onClick={() => this.props.handleTreated(a, i)}
              id={a.DOC_ID}
            >
              Treated
            </button>
          </td>
          <td style={{ textAlign: "center" }} className="cancel">
            <button
              onClick={() => this.props.handleDinCome(a, i)}
              id={a.DOC_ID}
            >
              Didn't Come
            </button>
          </td>
        </tr>
      ));
    } else if (this.props.tableHeading === "History") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>PATIENT NAME</th>
          <th>PHONE NUMBER</th>
          <th>DATE</th>
          <th>TIME</th>
        </tr>
      );
      tableContent = this.props.tableData.map((a, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{a.PATIENT_NAME.toUpperCase()}</td>
          <td>{a.PHONE_NUMBER}</td>
          <td>{a.DATE}</td>
          <td>{a.TIME}</td>
        </tr>
      ));
    } else if (this.props.tableHeading === "My Feedback") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>REMARKS</th>
        </tr>
      );
      tableContent = this.props.tableData.map((a, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td className="remarkCol">{a.REMARK.toUpperCase()}</td>
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

export default DocHomeTable;
