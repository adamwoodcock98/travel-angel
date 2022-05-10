import React from "react";
import { Dialog, DialogContentText } from "@mui/material";
import moment from "moment";

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
