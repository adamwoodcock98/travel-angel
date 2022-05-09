import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import { DisplayProfile } from "./displayProfile";
import { Settings } from "./settings";
import axios from "axios";

export const Profile = ({ session }) => {
  const userId = session
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userId !== "null") {
      axios.get(`http://localhost:8000/user/${userId}/profile`).then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  if (user) {
    return (
      <div>
        <div onClick={handleOpen}>
          Account
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DisplayProfile user={user} />
            <Button><Settings session={session} /></Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return <i>...</i>
  }
};