import AddPassport from "./addPassport.js";
import { DisplayPassport } from "./displayPassport";
import React, { useState, useEffect } from "react";
import { Alerts } from "../../assets/snackbar";
import axios from "axios";
import "./passport.css";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const Passport = ({ session }) => {
  console.log("This is the passport rendering");

  const userId = session;
  const [open, setOpen] = useState(false);
  const [openPassport, setOpenPassport] = useState(false);
  const [displayState, setDisplayState] = useState([]);
  const [emptyFields, setEmptyFields] = useState([])
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

  const handleChange = (e) => {
    const value = e.target.value;
    setPassport({
      ...passport,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      passportNumber,
      firstName,
      lastName,
      nationality,
      country,
      dob,
      gender,
      placeOfBirth,
      dateOfIssue,
      dateOfExpiry,
      user,
    } = passport;

    const newPassport = {
      passportNumber,
      firstName,
      lastName,
      nationality,
      country,
      dob,
      gender,
      placeOfBirth,
      dateOfIssue,
      dateOfExpiry,
      user,
    };

    if(passportNumber === "" || firstName === "" || lastName === "" || nationality === "" || country === "" || dob === ""){
      setEmptyFields(['passportNumber', 'firstName', 'lastName', 'nationality', 'country', 'dob'])
      return
    }

    await axios
      .post("http://localhost:8000/dashboard/passport/", newPassport)
      .then((res) => {
        setPassport({
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
        handleClose();
        setDisplayState([...displayState, res.data.passport]);
        handleAlert(res.data.msg, res.data.type);
      });
  };

  const handleAlert = (msg, type) => {
    setAlertOpen(true);
    setAlertMessage(msg);
    setAlertType(type);
  };

  useEffect(() => {
    if (userId !== "null") {
      axios
        .get(`http://localhost:8000/dashboard/passport/${userId}`)
        .then((res) => {
          setDisplayState(res.data.passport);
        });
    }
  }, [passport]);

  const passportRender = [];
  displayState.sort(
    (pass1, pass2) =>
      new Date(pass2.dateOfExpiry) - new Date(pass1.dateOfExpiry)
  );
  displayState.forEach((pass) => {
    passportRender.push(<DisplayPassport passport={pass} />);
  });

  if (displayState.length) {
    return (
      <div id="Passport">
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
            handleChange={handleChange}
            passport={passport}
            onSubmit={onSubmit}
            emptyFields={emptyFields}
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
      <div>
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
              handleChange={handleChange}
              passport={passport}
              onSubmit={onSubmit}
              emptyFields={emptyFields}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};
