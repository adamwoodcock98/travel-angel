import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SignIn({
  open,
  handleOpen,
  handleClose,
  handleChange,
  user,
  handleSubmit,
}) {
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Sign In
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please sign in to manage your holiday
          </DialogContentText>
          <TextField
            value={user.emailAddress}
            autoFocus
            margin="dense"
            id="emailLogIn"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="passwordLogIn"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            required
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Sign In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
