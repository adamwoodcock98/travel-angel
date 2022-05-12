import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SignUp({
  open,
  handleOpen,
  handleClose,
  handleChange,
  user,
  handleSubmit,
}) {
  return (
    <div>
      <Button id="auth-btn" variant="filled" onClick={handleOpen}>
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sign Up to Travel Angel to organise your holiday. All documents in
            one place!
          </DialogContentText>
          <TextField
            value={user.firstName}
            autoFocus
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={handleChange}
          />
          <TextField
            value={user.lastName}
            autoFocus
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={handleChange}
          />
          <TextField
            value={user.emailAddress}
            autoFocus
            margin="dense"
            id="email"
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
            id="password"
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
          <Button onClick={handleSubmit}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export const UnstyledSignUp = ({
  open,
  handleOpen,
  handleClose,
  handleChange,
  user,
  handleSubmit,
}) => {
  return (
    <div>
      <div onClick={handleOpen}>Get Started</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sign Up to Travel Angel to organise your holiday. All documents in
            one place!
          </DialogContentText>
          <TextField
            value={user.firstName}
            autoFocus
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={handleChange}
          />
          <TextField
            value={user.lastName}
            autoFocus
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={handleChange}
          />
          <TextField
            value={user.emailAddress}
            autoFocus
            margin="dense"
            id="email"
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
            id="password"
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
          <Button onClick={handleSubmit}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
