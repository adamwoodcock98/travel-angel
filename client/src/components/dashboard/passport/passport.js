import AddPassport from "./addPassport.js";
import { DisplayPassport } from "./displayPassport";
import React, { useState, useEffect } from "react";
import { Alerts } from "../../assets/snackbar";
import axios from "axios";
import "./passport.css";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';

const Passport = ({ session }) => {
  const userId = session;
  const [open, setOpen] = useState(false);
  const [displayState, setDisplayState] = useState([]);
  const [passport, setPassport] = useState({
    passportNumber: "",
    firstName: "",
    lastName: "",
    nationality: "",
    country: "",
    dob: "",
    gender: "",
    placeOfBirth: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    user: userId,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [alertType, setAlertType] = useState("success");

  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  useEffect(() => {
    if (userId !== "null") {
      axios.get(`http://localhost:8000/dashboard/passport/${userId}`).then((res) => {
        setDisplayState(res.data.passport);
      });
    }
  }, []);

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const passportRender = [];
  displayState.sort(
    (pass1, pass2) =>
      new Date(pass2.dateOfExpiry) - new Date(pass1.dateOfExpiry)
  );
  displayState.forEach((pass) => {
    console.log("the pass", pass)
    passportRender.push(<DisplayPassport passport={pass} userId={userId} />);
  });


  if (displayState.length) {
    return (
      <div id="Passport">
        <h1 className="pass-h1">Passport</h1>
        <Fab
        id="pass-fab"
        size="medium"
        color="secondary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <AddPassport
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          passportData={passport}
          passportId={null}
          user={userId}
        />
        <div id="pass-render">{passportRender}</div>
        <Alerts
          message={alertMessage}
          open={alertOpen}
          handleClose={handleAlertClose}
          alertPosition={alertPosition}
          alertType={alertType}
        />
      </div>
    );
  } else {
    return (
      <div>
      <h1 className="pass-h1">Passport</h1>
      <Fab
        id="pass-fab"
        size="medium"
        color="secondary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <AddPassport
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          passportData={passport}
          passportId={null}
          user={userId}
        />
     <br /><i className="pass-i">You don't have your passports saved just yet. Add it now!</i>
    </div>
    );
  }
};

export default Passport;
