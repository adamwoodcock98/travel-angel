import React, { useState } from "react";
import axios from "axios";
import SignUp from "./signUp/signUp";
import LogIn from "./logIn/logIn";
import { Alerts } from "../assets/snackbar";

export const Authentication = () => {
  const url = "http://localhost:8000";
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [openLogIn, setOpenLogIn] = useState(false);
  const [userLogIn, setUserLogIn] = useState({
    email: "",
    password: "",
  });

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

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios.post(`${url}/user/sign-up`, newUser).then((res) => {
      handleClose();
      handleAlert(res.data.msg, res.data.type);
    });
  };

  const handleChangeLogIn = (e) => {
    const value = e.target.value;
    setUserLogIn({
      ...userLogIn,
      [e.target.name]: value,
    });
  };

  const handleOpenLogIn = () => {
    setOpenLogIn(true);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };

  const handleSubmitLogIn = async (e) => {
    e.preventDefault();

    const { email, password } = userLogIn;
    const newUser = { email, password };

    await axios.post(`${url}/user/log-in`, newUser).then((res) => {
      handleCloseLogIn();
      handleAlert(res.data.msg, res.data.type);
    });
  };

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  return (
    <div className="Authentication">
      <SignUp
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        user={user}
        handleSubmit={handleSubmit}
      />
      <LogIn
        open={openLogIn}
        handleOpen={handleOpenLogIn}
        handleClose={handleCloseLogIn}
        handleChange={handleChangeLogIn}
        user={userLogIn}
        handleSubmit={handleSubmitLogIn}
      />
      <Alerts
        message={alertMessage}
        open={alertOpen}
        handleClose={handleAlertClose}
        alertPosition={alertPosition}
        alertType={alertType}
      />
    </div>
  );
};
