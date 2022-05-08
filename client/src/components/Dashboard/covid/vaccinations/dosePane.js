import React from "react";
import moment from "moment";
import "./dosePane.css"

const DosePane = (props) => {
  const dose = props.doseData

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");

  return(
    <div className="doses">
      <div className="vaccine-card-dose">
        <h4>Dose</h4>
        <p>{dose.dose}</p>
      </div>
      <div className="vaccine-card-dose-date">
        <h4>Date</h4>
        <p>{formatDate(dose.date)}</p>
      </div>
      <div className="vaccine-card-dose-type">
        <h4>Type</h4>
        <p>{dose.type}</p>
      </div>
    </div>
  )
}

export default DosePane;