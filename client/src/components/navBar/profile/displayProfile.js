import React from "react";
import { DialogContentText } from "@mui/material";

export const DisplayProfile = ({ user }) => {
  return (
    <div>
        <DialogContentText>
        <img alt="Profile" src={user.profilePicture} />
        </DialogContentText>
        <DialogContentText id="profile-txt">
        <h3>{user.firstName} {user.lastName}</h3>
          <i>{user.email}</i>
        </DialogContentText>
    </div>
  );
};
