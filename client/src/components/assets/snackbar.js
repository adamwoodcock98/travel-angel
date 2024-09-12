import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import "./snackbar.css"

export const Alerts = ({
  message,
  open,
  handleClose,
  alertPosition,
  alertType,
}) => {
  return (
    <Snackbar
      anchorOrigin={alertPosition}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      key={alertPosition.vertical + alertPosition.horizontal}
    >
      <Alert id="alert" variant="standard" severity={alertType}>{message}</Alert>
    </Snackbar>
  );
};
