import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "./dosePane.css";
import AddVaccine from "./newVaccine";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const DosePane = (props) => {
  const dose = props.doseData;
  const vaccinationsID = props.vaccinationsID;
  const refresh = props.refresh;
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
  };

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");

  return (
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
