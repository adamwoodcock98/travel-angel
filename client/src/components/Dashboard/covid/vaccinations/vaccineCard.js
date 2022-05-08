import React, { useState } from "react";
import "./vaccineCard.css";
import Button from '@mui/material/Button';
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AddVaccine from "./newVaccine";
import DosePane from "./dosePane";

const VaccineCard = (props) => {
  const [open, setOpen] = useState(false);
  const vaccinationsData = props.vaccinationsData;
  const doses = vaccinationsData.vaccineDoses;

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const dosesArray = [];
  vaccinationsData.vaccineDoses.forEach(dose => {
    dosesArray.push(<DosePane doseData={dose} />)
  })

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
        <div className="vaccine-card-dose-title">
          <h2>Vaccine dose</h2>
        </div>
        <div className="vaccine-card-dose-pane">
          {vaccinationsData.vaccineDoses && dosesArray}
        </div>
        <div className="vaccine-card-dose-button">
          {dosesArray.length < 3 && <Button color="secondary" startIcon={<VaccinesOutlinedIcon />} onClick={handleOpen}>Add dose</Button>}
          <AddVaccine open={open} handleOpen={handleOpen} handleClose={handleClose} vaccinationsID={vaccinationsData._id} />
        </div>
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