import React, { useState } from "react";
import "./vaccineCard.css";
import Button from "@mui/material/Button";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AddVaccine from "./newVaccine";
import DosePane from "./dosePane";
import Upload from "../../../upload/upload";
import "../../../assets/styling/cards.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const VaccineCard = (props) => {
  const [open, setOpen] = useState(false);
  const vaccinationsData = props.vaccinationsData;
  const handleUpload = props.handleUpload;
  const doses = vaccinationsData.vaccineDoses;
  const refresh = props.refresh;
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

  const dosesArray = [];
  if (vaccinationsData && vaccinationsData.vaccineDoses.length) {
    vaccinationsData.vaccineDoses.forEach((dose, index) => {
      dosesArray.push(
        <DosePane
          doseData={dose}
          vaccinationsID={vaccinationsData._id}
          key={index}
          handleUpload={handleUpload}
          refresh={refresh}
        />
      );
    });
  }

  return (
    <div className="vaccine-card covid-card">
      <div className="vaccine-card-header">
        <h1>Vaccine card</h1>
      </div>
      <div className="vaccine-card-status-content">
        <p className="light-label">Status</p>
        <h3>{vaccinationsData.vaccinationStatus}</h3>
      </div>
      <div className="vaccine-card-dose-content">
        <div className="vaccine-card-dose-title">
          <p className="light-label"></p>
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
      <div className="vaccine-card-documents-content document-content">
        <h4 className="light-label">Supporting documents</h4>
      </div>
      <div className="upload">
        <div className="uploads">
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="documents"
          >
            <h4>Documents</h4>
            <Upload
              cardId={vaccinationsData._id}
              url="dashboard/covid"
              handleUpload={handleUpload}
            />
          </div>
          <i>
            Use this section to store any additional documents you may need for
            your vaccinations
          </i>
          {vaccinationsData.uploads.length > 0 &&
            vaccinationsData.uploads.map((upload, index) => {
              return (
                <div className="document-button">
                  <Button
                    style={{ padding: "0%" }}
                    color="primary"
                    onClick={() => handleSubmit(upload._id)}
                    key={index}
                    endIcon={<FileDownloadOutlinedIcon />}
                  >
                    {upload.name}
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default VaccineCard;
