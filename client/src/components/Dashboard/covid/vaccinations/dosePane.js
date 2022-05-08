import React from "react";
import moment from "moment";
import "./vaccineCard.css"

const DosePane = (props) => {
  const [dose, date, type] = props.doseData;

  return(
    <>
      <div className="vaccine-card-dose">
        <h3>Dose</h3>
        <p>{dose}</p>
      </div>
      <div className="vaccine-card-dose-date">
        <h3>Date</h3>
        <p>{date}</p>
      </div>
      <div className="vaccine-card-dose-type">
        <h3>Type</h3>
        <p>{type}</p>
      </div>
    </>
  )
}

export default DosePane;