import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddParking = (props) => {
  const userId = props.userId;
  console.log(userId)
  const open = props.open;
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const parkingData = props.parkingData;
  const parkingId = props.parkingId;
  const [parking, setParking] = useState({
    startDate: parkingData.startDate,
    endDate: parkingData.endDate,
    airport: parkingData.airport,
    type: parkingData.type,
    regPlate: parkingData.regPlate,
    company: parkingData.company,
    contactNumber: parkingData.contactNumber,
    bookingReference: parkingData.bookingReference,
    notes: parkingData.notes,
    buildingNumber: parkingData.address.buildingNumber,
    buildingName: parkingData.address.buildingName,
    addressLine1: parkingData.address.addressLine1,
    addressLine2: parkingData.address.addressLine2,
    city: parkingData.address.city,
    postalCode: parkingData.address.postalCode,
    stateCounty: parkingData.address.stateCounty,
    countryCode: parkingData.address.countryCode,
    user: userId,
  });

  console.log(parking.user)

  const handleChange = (e) => {
    const value = e.target.value;
    setParking({
      ...parking,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let url;
    if (parkingId) {
      url = `http://localhost:8000/dashboard/parking/edit/${parkingId}`
    } else {
      url = `http://localhost:8000/dashboard/parking/`
    }

    const {
      startDate,
      endDate,
      airport,
      type,
      regPlate,
      company,
      contactNumber,
      bookingReference,
      notes,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
    } = parking;

    const newBooking = {
      startDate,
      endDate,
      airport,
      type,
      regPlate,
      company,
      contactNumber,
      bookingReference,
      notes,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
      user: userId,
    };



    axios.post(url, newBooking).then((res) => {
      handleClose();
      setParking({
        startDate: "",
        endDate: "",
        airport: "",
        type: "",
        regPlate: "",
        company: "",
        contactNumber: "",
        bookingReference: "",
        notes: "",
        buildingNumber: "",
        buildingName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        stateCounty: "",
        countryCode: "",
        user: userId,
      });
    });
  };

  return (
    <div>
      <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Parking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store your parking details
          </DialogContentText>
          <TextField
            value={parking.startDate}
            autoFocus
            margin="dense"
            id="startDate"
            name="startDate"
            label="Start Date & Time"
            type="datetime-local"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={parking.endDate}
            autoFocus
            margin="dense"
            id="endDate"
            name="endDate"
            label="End Date & Time"
            type="datetime-local"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={parking.airport}
            autoFocus
            margin="dense"
            id="airport"
            name="airport"
            label="Airport"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.type}
            autoFocus
            margin="dense"
            id="type"
            name="type"
            label="Car Park Type"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.regPlate}
            autoFocus
            margin="dense"
            id="regPlate"
            name="regPlate"
            label="Vehicle Registration"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.company}
            autoFocus
            margin="dense"
            id="company"
            name="company"
            label="Company"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.contactNumber}
            autoFocus
            margin="dense"
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.bookingReference}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.notes}
            autoFocus
            margin="dense"
            id="notes"
            name="notes"
            label="Notes"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.buildingNumber}
            inputProps={{ "data-testid": "buildingNumber" }}
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
            value={parking.buildingName}
            inputProps={{ "data-testid": "buildingName" }}
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
            value={parking.addressLine1}
            inputProps={{ "data-testid": "addressLine1" }}
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
            value={parking.addressLine2}
            inputProps={{ "data-testid": "addressLine2" }}
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
            value={parking.city}
            inputProps={{ "data-testid": "city" }}
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
            value={parking.stateCounty}
            inputProps={{ "data-testid": "stateCounty" }}
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
            value={parking.postalCode}
            inputProps={{ "data-testid": "postalCode" }}
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
            value={parking.countryCode}
            inputProps={{ "data-testid": "countryCode" }}
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
          <Button onClick={onSubmit}>Save Parking Details</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddParking;