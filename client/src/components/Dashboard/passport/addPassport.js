import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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
      <Button variant="outlined" onClick={handleOpen}>
        Add Passport
      </Button>
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
            label="Date Of Birth "
            type="date"
            variant="outlined"
            required
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            value={passport.gender}
            autoFocus
            margin="dense"
            id="gender"
            name="gender"
            label="Gender"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
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
            label="Date of Issue "
            type="date"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChange}
          />
          <TextField
            value={passport.dateOfExpiry}
            autoFocus
            margin="dense"
            id="dateOfExpiry"
            name="dateOfExpiry"
            label="Date of Expiry "
            type="date"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChange}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save Passport Details</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
