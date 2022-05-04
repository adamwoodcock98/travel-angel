import React, { useState } from "react";
import axios from "axios";
import SignUp from "./signUp/signUp";
import LogIn from "./logIn/logIn";
import { Alert } from "./snackbar"
import Button from "@mui/material/Button";

export const Authentication = () => {
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

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const alertPosition = {
    vertical: 'top',
    horizontal: 'center',
  }

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
    const newUser = JSON.stringify({ firstName, lastName, email, password });

    await axios.post("http://localhost:8000/user/sign-up", newUser, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }}).then((res) => {
      handleClose();
      handleAlert(res.data.msg);
      // window.location = "/";
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

    const { email, password } = user;
    const newUser = JSON.stringify({ email, password });

    await axios
      .post("http://localhost:8000/user/log-in", newUser)
      .then((res) => {
        console.log(res.data.msg);
        handleClose();
        handleAlert(res.data.msg);
        // window.location = "/";
      });
  };

  const handleSubmitLogOut = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios
      .post("http://localhost:8000/user/log-out", newUser)
      .then((res) => {
        handleClose();
        window.location = "/";
        handleAlert(res.data.msg);
      });
  };

  const handleAlert = (message) => {
    setAlertOpen(true)
    setAlertMessage(message)
  }

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
      <Button 
        variant="outlined" 
        onClick={handleSubmitLogOut}
      >
        Log Out
      </Button>
      <Alert 
        message={alertMessage} 
        open={alertOpen} 
        handleClose={handleAlertClose}
        alertPosition = {alertPosition}
        />
    </div>
  );
};
