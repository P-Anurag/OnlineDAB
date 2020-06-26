import React, { Component } from "react";
import "./tableDoc.css";

class TableDoc extends Component {
  state = {};
  render() {
    let tableHead, tableContent;
    if (this.props.tabHead === "Registered Doctors") {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>DOCTOR NAME</th>
          <th>REG NO.</th>
          <th>SPECIALIZATION</th>
          <th>LOCALITY</th>
          <th>VALID</th>
          <th>INVALID(DELETE)</th>
        </tr>
      );
      tableContent = this.props.doctor.map((d, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{d.NAME.toUpperCase()}</td>
          <td>{d.REGNO.toUpperCase()}</td>
          <td>{d.SPECIALIZATION.toUpperCase()}</td>
          <td>{d.LOCATION.toUpperCase()}</td>
          <td style={{ textAlign: "center" }} className="valid">
            <button
              id={d.DOC_ID}
              onClick={() => this.props.handleValid(d.DOC_ID, i)}
            >
              Valid
            </button>
          </td>
          <td style={{ textAlign: "center" }} className="invalid">
            <button
              id={d.DOC_ID}
              onClick={() => this.props.handleInvalid(d.DOC_ID, i)}
            >
              Invalid(Delete)
            </button>
          </td>
        </tr>
      ));
    } else if (
      this.props.tabHead === "Valid Doctors" ||
      this.props.tabHead === "All Doctors"
    ) {
      tableHead = (
        <tr>
          <th>SL. NO.</th>
          <th>DOCTOR NAME</th>
          <th>REGNO</th>
          <th>SPECIALIZATION</th>
          <th>LOCALITY</th>
        </tr>
      );
      tableContent = this.props.doctor.map((d, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{d.NAME.toUpperCase()}</td>
          <td>{d.REGNO.toUpperCase()}</td>
          <td>{d.SPECIALIZATION.toUpperCase()}</td>
          <td>{d.LOCATION.toUpperCase()}</td>
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

export default TableDoc;
