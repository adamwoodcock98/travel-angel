import * as React from "react";
import{ Snackbar, Alert } from "@mui/material";

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
      <Alert severity={alertType}>{message}</Alert>
    </Snackbar>
  );
};
