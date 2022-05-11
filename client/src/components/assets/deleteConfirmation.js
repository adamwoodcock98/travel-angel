import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteButton from "./deleteButton";
import { Alerts } from "./snackbar"

export default function DeleteDialogue({
  open,
  handleDeletePromptClose,
  dataType,
  objectId,
}) {
  const handleDelete = () => {
    handleDeletePromptClose();
    axios.post(
      `http://localhost:8000/dashboard/${dataType}/delete/${objectId}`
    ).then(res => {
      handleAlert("Item successfully deleted", "success");
    })
    .catch(err => {
      console.log(err.message)
      handleAlert("Unable to delete item", "error");
    });
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDeletePromptClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? <br />
            <br /> This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletePromptClose} autoFocus>
            Cancel
          </Button>
          <DeleteButton handleClick={handleDelete} />
        </DialogActions>
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
}
