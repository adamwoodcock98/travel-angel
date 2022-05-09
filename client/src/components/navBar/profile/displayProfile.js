import React, { useState } from "react";
import { DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import moment from "moment";

export const DisplayProfile = ({ user }) => {
  return (
    <div>
      <DialogTitle>{user.firstName} {user.lastName}</DialogTitle>
      <DialogContent>
        <img alt="Profile" src={user.profilePicture} />
          <DialogContentText>
            E-mail: {user.email}
          </DialogContentText>
      </DialogContent>
    </div>
  );
};
