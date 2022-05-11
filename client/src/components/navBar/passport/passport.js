import AddPassport from "./addPassport.js";
import { DisplayPassport } from "./displayPassport";
import React, { useState, useEffect } from "react";
import { Alerts } from "../../assets/snackbar";
import axios from "axios";
import "./passport.css";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const Passport = ({ session }) => {
  const userId = session;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openPassport, setOpenPassport] = useState(false);
  const [displayState, setDisplayState] = useState([]);
  const [didUpdate, setDidUpdate] = useState(false);
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
    setDidUpdate(!didUpdate);
  };

  const handleOpenPassport = () => {
    setOpenPassport(true);
  };

  const handleClosePassport = () => {
    setOpenPassport(false);
  };

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [alertType, setAlertType] = useState("success");

  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  useEffect(() => {
    setLoading(true);
    if (userId !== "null") {
      axios.get(`http://localhost:8000/dashboard/passport/${userId}`).then((res) => {
        setDisplayState(res.data.passport);
      })
      .catch((error) => {
        if (error.response.status) {
          handleAlert(
            error.response.status + " - " + error.response.statusText,
            "error"
          );
        } else {
          handleAlert(
            "There was a problem connecting to the server.",
            "error"
          );
        }
      })
      .finally(() => setLoading(false));;
    }
  }, [didUpdate]);

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
    passportRender.push(<DisplayPassport passport={pass} userId={userId} refresh={handleClose} />);
  });


  if (displayState.length) {
    return (
      <div id="Passport">
        <div className="loading" style={{ display: loading ? "" : "none"}} >
          <CircularProgress color="secondary" />
        </div>
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
        <div onClick={handleOpenPassport}>Passport</div>
        <Dialog open={openPassport} onClose={handleClosePassport}>
          <DialogTitle>Passport</DialogTitle>
          <DialogContent>
            <div id="pass-render">{passportRender}</div>
          </DialogContent>
          <AddPassport
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            passportData={passport}
            passportId={null}
            user={userId}
          />
        </Dialog>
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
      <>
        <div onClick={handleOpenPassport}>Passport</div>
          <Dialog open={openPassport} onClose={handleClosePassport}>
          <DialogTitle>Passport</DialogTitle>
          <DialogContent>
              <DialogContentText>
                You don't have your passports saved just yet. Add it now!
              </DialogContentText>
                <AddPassport
                  open={open}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  passportData={passport}
                  passportId={null}
                  user={userId}
              />
            </DialogContent>
          </Dialog>
      </>
    );
  }
};
