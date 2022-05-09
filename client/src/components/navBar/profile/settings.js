import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import { Alerts } from "../../assets/snackbar";
import { Profile } from "./profile";

export const Settings = ({ session }) => {
  const userId = session;
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, profilePicture } = user;
    const updatedUser = {
      firstName,
      lastName,
      email,
      password,
      profilePicture,
    };

    await axios
      .post(`http://localhost:8000/user/${userId}/save`, updatedUser)
      .then((res) => {
        handleClose();
        <Profile session={res.data.user._id} />;
        handleAlert(res.data.msg, res.data.type);
      });
  };

  useEffect(() => {
    if (userId !== "null") {
      axios.get(`http://localhost:8000/user/${userId}/settings`).then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  if (user) {
    return (
      <div>
        <div onClick={handleOpen}>Settings</div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                value={user.firstName}
                autoFocus
                fullWidth
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                variant="outlined"
                required
                onChange={handleChange}
              />
              <TextField
                value={user.lastName}
                autoFocus
                fullWidth
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                variant="outlined"
                required
                onChange={handleChange}
              />
              <TextField
                value={user.email}
                autoFocus
                fullWidth
                margin="dense"
                id="email"
                name="email"
                label="E-mail"
                type="email"
                variant="outlined"
                required
                onChange={handleChange}
              />
              <TextField
                value={user.profilePicture}
                autoFocus
                margin="dense"
                id="profilePicture"
                name="profilePicture"
                label="Profile Picture"
                type="text"
                variant="outlined"
                onChange={handleChange}
              />
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
          </DialogContent>
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
    return <i>...</i>;
  }
};
