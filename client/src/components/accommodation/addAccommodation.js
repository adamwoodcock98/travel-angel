import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function AddAccommodation() {
  const [open, setOpen] = useState(false);
  const [accommodation, setAccommodation] = useState({
    name: "",
    contactNumber: "",
    checkInDate: "",
    checkOutDate: "",
    checkInTime: "",
    checkOutTime: "",
    bookingReference: "",
    buildingNumber: "",
    buildingName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    stateCounty: "",
    countryCode: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setAccommodation({
      ...accommodation,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      contactNumber,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      bookingReference,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
    } = accommodation;

    const newAccommodation = {
      name,
      contactNumber,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      bookingReference,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
    };

    await axios
      .post("http://localhost:5000/dashboard/accommodation", newAccommodation)
      .then(() => {
        handleClose();
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add Accommodation
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Accommodation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Accommodation. Fill in the fields to store your Accommodation
            details
          </DialogContentText>
          <TextField
            value={accommodation.name}
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Accomodation Name"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.contactNumber}
            autoFocus
            margin="dense"
            id="contactNumber"
            name="contactNumber"
            label="Accommodation Contact Number"
            type="number"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkInDate}
            autoFocus
            margin="dense"
            id="checkInDate"
            name="checkInDate"
            label="Date of Arrival"
            type="date"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkOutDate}
            autoFocus
            margin="dense"
            id="checkOutDate"
            name="checkOutDate"
            label="Date of Departure"
            type="date"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkInTime}
            autoFocus
            margin="dense"
            id="checkInTime"
            name="checkInTime"
            label="Time of Arrival"
            type="time"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkOutTime}
            autoFocus
            margin="dense"
            id="checkOutTime"
            name="checkOutTime"
            label="Time of Departure"
            type="time"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.bookingReference}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.buildingNumber}
            autoFocus
            margin="dense"
            id="buildingNumber"
            name="buildingNumber"
            label="Building Number"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={accommodation.buildingName}
            autoFocus
            margin="dense"
            id="buildingName"
            name="buildingName"
            label="Building Name"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={accommodation.addressLine1}
            autoFocus
            margin="dense"
            id="addressLine1"
            name="addressLine1"
            label="Address Line 1"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.addressLine2}
            autoFocus
            margin="dense"
            id="addressLine2"
            name="addressLine2"
            label="Address Line 2"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={accommodation.city}
            autoFocus
            margin="dense"
            id="city"
            name="city"
            label="City"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.stateCounty}
            autoFocus
            margin="dense"
            id="stateCounty"
            name="stateCounty"
            label="State/Province"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={accommodation.postalCode}
            autoFocus
            margin="dense"
            id="postalCode"
            name="postalCode"
            label="Postal/Zip Code"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.countryCode}
            autoFocus
            margin="dense"
            id="countryCode"
            name="countryCode"
            label="Country"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={onSubmit}>Save Accommodation Details</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
