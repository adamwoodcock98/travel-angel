import React, { useState } from "react";
import axios from "axios";
import { Alerts } from "../../assets/snackbar";
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

export default function AddPassport({
  open,
  handleOpen,
  handleClose,
  passportId,
  passportData,
  user,
}) {
  const [emptyFields, setEmptyFields] = useState([]);
  const [passport, setPassport] = useState({
    passportNumber: passportData.passportNumber,
    firstName: passportData.firstName,
    lastName: passportData.lastName,
    nationality: passportData.nationality,
    country: passportData.country,
    dob: passportData.dob,
    gender: passportData.gender,
    placeOfBirth: passportData.placeOfBirth,
    dateOfIssue: passportData.dateOfIssue,
    dateOfExpiry: passportData.dateOfExpiry,
    user: user,
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassport({
      ...passport,
      [e.target.name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let url;
    if (passportId) {
      url = `http://localhost:8000/dashboard/passport/edit/${passportId}`
    } else {
      url = `http://localhost:8000/dashboard/passport/`
    }

    const {
      passportNumber,
      firstName,
      lastName,
      nationality,
      country,
      dob,
      gender,
      placeOfBirth,
      dateOfIssue,
      dateOfExpiry,
      user,
    } = passport;

    const newPassport = {
      passportNumber,
      firstName,
      lastName,
      nationality,
      country,
      dob,
      gender,
      placeOfBirth,
      dateOfIssue,
      dateOfExpiry,
      user,
    };

    if(passportNumber === "" || firstName === "" || lastName === "" || nationality === "" || country === "" || dob === ""){
      setEmptyFields(['passportNumber', 'firstName', 'lastName', 'nationality', 'country', 'dob'])
      return
    }

    await axios
      .post(url, newPassport)
      .then((res) => {
        handleAlert("Passport added successfully.", "success");
        setPassport({
          passportNumber: "",
          firstName: "",
          lastName: "",
          nationality: "",
          country: "",
          dob: "",
          gender: "",
          placeOfBirth: "",
          dateOfIssue: "",
          dateOfExpiry: "",
          user: user,
        })
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
        handleAlert("Whoops! We couldn't add your passport, please try again.", "error");
      });;;
  };


  return (
    <div>
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
              sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
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
      <Alerts
          message={alertMessage}
          open={alertOpen}
          handleClose={handleAlertClose}
          alertPosition={alertPosition}
          alertType={alertType}
        />
    </div>
  );
}
