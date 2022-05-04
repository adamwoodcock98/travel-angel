import * as React from 'react';
import Snackbar from "@mui/material/Snackbar";
export const Alert = ({message, open, handleClose, alertPosition}) => {

  return (
      <Snackbar
        anchorOrigin={ alertPosition }
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        message={message}
        key={alertPosition.vertical + alertPosition.horizontal}
      />
  );
}