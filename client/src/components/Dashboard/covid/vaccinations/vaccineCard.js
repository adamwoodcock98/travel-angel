import React, { useState } from "react";
import "./vaccineCard.css";
import moment from "moment";
import Button from '@mui/material/Button';
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AddVaccine from "./newVaccine";

const VaccineCard = (props) => {
  const [open, setOpen] = useState(false);
  const vaccinationsData = props.vaccinationsData;
  console.log(vaccinationsData)

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");

  // const dosesArray = [];
  // vaccinationsData.vaccineDoses.forEach(dose => {
  //   dosesArray.push()
  // })

  return(
    <div className="vaccine-card">
      <div className="vaccine-card-header">
        <h1>Vaccinations</h1>
      </div>
      <div className="vaccine-card-status-content">
        <h2>Vaccination status</h2>
        <h4>{vaccinationsData.vaccinationStatus}</h4>
      </div>
      <div className="vaccine-card-dose-content">
        <h2>Vaccine dose</h2>
        
      </div>
      <div className="vaccine-card-proof-content">
        <h2>Vaccine proof</h2>
      </div>
      <div className="vaccine-card-documents-content">
        <h2>Additional documents</h2>
      </div>
    </div>
  )
}

export default VaccineCard;