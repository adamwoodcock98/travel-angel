import React, { useState } from "react";
import "./vaccineCard.css";
import Button from "@mui/material/Button";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AddVaccine from "./newVaccine";
import DosePane from "./dosePane";
import Upload from "../../../upload/upload";

const VaccineCard = (props) => {
  const [open, setOpen] = useState(false);
  const vaccinationsData = props.vaccinationsData;
  const handleUpload = props.handleUpload;
  const doseData = {
    dose: "",
    date: "",
    type: "",
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/covid/download/${id}`);
  };

  console.log("this is the vaccine card");

  const dosesArray = [];
  if (vaccinationsData && vaccinationsData.vaccineDoses.length) {
    vaccinationsData.vaccineDoses.forEach((dose, index) => {
      dosesArray.push(
        <DosePane
          doseData={dose}
          vaccinationsID={vaccinationsData._id}
          key={index}
          handleUpload={handleUpload}
        />
      );
    });
  }

  return (
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
          {dosesArray.length < 3 && (
            <Button
              color="secondary"
              startIcon={<VaccinesOutlinedIcon />}
              onClick={handleOpen}
            >
              Add dose
            </Button>
          )}
          <AddVaccine
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            vaccinationsID={vaccinationsData._id}
            doseData={doseData}
            doseId={null}
            handleUpload={handleUpload}
          />
        </div>
      </div>
      <div className="vaccine-card-proof-content">
        <h2>Vaccine proof</h2>
      </div>
      <div className="vaccine-card-documents-content">
        <h2>Additional documents</h2>
      </div>
      <div className="upload">
        <Upload
          cardId={vaccinationsData._id}
          url="dashboard/covid"
          handleUpload={handleUpload}
        />
        <div className="uploads">
          Download Your Documents
          {vaccinationsData.uploads.length &&
            vaccinationsData.uploads.map((upload, index) => {
              return (
                <button onClick={() => handleSubmit(upload._id)} key={index}>
                  {upload.name}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default VaccineCard;
