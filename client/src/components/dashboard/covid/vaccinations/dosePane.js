import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "./dosePane.css";
import AddVaccine from "./newVaccine";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "../../../assets/styling/cards.css";

const DosePane = (props) => {
  const dose = props.doseData;
  const vaccinationsID = props.vaccinationsID;
  const handleUpload = props.handleUpload;
  const [open, setOpen] = useState(false);

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios.post(
      `http://localhost:8000/dashboard/covid/vaccination/${vaccinationsID}/delete/${dose._id}`
    );
    handleUpload();
  };

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");

  return (
    <div className="doses">
      <div className="vaccine-card-dose">
        <p className="fuschia">Dose</p>
        <h4>{dose.dose}</h4>
      </div>
      <div className="vaccine-card-dose-date">
        <p className="fuschia">Date</p>
        <h4>{formatDate(dose.date)}</h4>
      </div>
      <div className="vaccine-card-dose-type">
        <p className="fuschia">Type</p>
        <h4>{dose.type}</h4>
      </div>
      <div className="vaccine-card-buttons">
        <IconButton aria-label="delete" onClick={handleEditOpen}>
          <EditOutlinedIcon />
        </IconButton>
        <AddVaccine
          open={open}
          handleOpen={handleEditOpen}
          handleClose={handleEditClose}
          doseData={dose}
          vaccinationsID={vaccinationsID}
          doseId={dose._id}
          handleUpload={handleUpload}
        />
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          style={{ color: "#FF4949" }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default DosePane;
