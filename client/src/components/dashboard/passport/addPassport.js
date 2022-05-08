import {
  Button,
  Fab,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export default function AddPassport({
  open,
  handleOpen,
  handleClose,
  handleChange,
  passport,
  onSubmit,
}) {
  return (
    <div>
      <Fab
        id="pass-fab"
        size="medium"
        color="secondary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Passport</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store your passport details
          </DialogContentText>
          <TextField
            value={passport.passportNumber}
            autoFocus
            margin="dense"
            id="passportNumber"
            name="passportNumber"
            label="Passport Number"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={passport.firstName}
            autoFocus
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={passport.lastName}
            autoFocus
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={passport.nationality}
            autoFocus
            margin="dense"
            id="nationality"
            name="nationality"
            label="Nationality"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={passport.country}
            autoFocus
            margin="dense"
            id="country"
            name="country"
            label="Country"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={passport.dob}
            autoFocus
            margin="dense"
            id="dob"
            name="dob"
            label="Date of Birth"
            type="date"
            inputProps={{ "data-testid": "dob-input" }}
            variant="outlined"
            required
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 190 }}>
            <InputLabel id="demo-select-small">Gender</InputLabel>
            <Select
              value={passport.gender}
              autoFocus
              margin="dense"
              id="gender"
              name="gender"
              label="Gender"
              inputProps={{ "data-testid": "gender-input" }}
              variant="outlined"
              onChange={handleChange}
              required
            >
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="X">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={passport.placeOfBirth}
            autoFocus
            margin="dense"
            id="placeOfBirth"
            name="placeOfBirth"
            label="Place of Birth"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={passport.dateOfIssue}
            autoFocus
            margin="dense"
            id="dateOfIssue"
            name="dateOfIssue"
            label="Date of Issue"
            type="date"
            inputProps={{ "data-testid": "dof-input" }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={passport.dateOfExpiry}
            autoFocus
            margin="dense"
            id="dateOfExpiry"
            name="dateOfExpiry"
            label="Date of Expiry"
            inputProps={{ "data-testid": "doe-input" }}
            type="date"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
