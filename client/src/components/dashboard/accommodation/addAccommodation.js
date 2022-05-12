import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alerts } from "../../assets/snackbar";
import moment from "moment";
import "../../assets/styling/cards.css"
import "../dashboard.css";

const AddAccommodation = (props) => {

  const formatDate = (date) => moment(date).format("yyyy-MM-DD");

  const userId = props.userId;
  const tripId = props.tripId;
  const accommodationData = props.accommodationData;
  console.log(accommodationData.name)
  const accommodationId = props.accommodationId;
  const open = props.open;
  const handleClose = props.handleClose;
  const [openAddress, setOpenAddress] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [accommodation, setAccommodation] = useState({
    name: accommodationData.name,
    contactNumber: accommodationData.contactNumber,
    checkInDate: accommodationData.checkInDate,
    checkOutDate: accommodationData.checkOutDate,
    checkInTime: accommodationData.checkInTime,
    checkOutTime: accommodationData.checkOutTime,
    bookingReference: accommodationData.bookingReference,
    buildingNumber: accommodationData.address.buildingNumber,
    buildingName: accommodationData.address.buildingName,
    addressLine1: accommodationData.address.addressLine1,
    addressLine2: accommodationData.address.addressLine2,
    city: accommodationData.address.city,
    postalCode: accommodationData.address.postalCode,
    stateCounty: accommodationData.address.stateCounty,
    countryCode: accommodationData.address.countryCode,
    user: userId,
    trip: tripId, 
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

  const handleExpand = () => {
    setOpenAddress(true)
  }

  const handleContract = () => {
    setAccommodation({
      name: accommodation.name,
      contactNumber: accommodation.contactNumber,
      checkInDate: accommodation.checkInDate,
      checkOutDate: accommodation.checkOutDate,
      checkInTime: accommodation.checkInTime,
      checkOutTime: accommodation.checkOutTime,
      bookingReference: accommodation.bookingReference,
      buildingNumber: "",
      buildingName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      stateCounty: "",
      countryCode: "",
      user: userId,
    })
    setOpenAddress(false)
  }
  

  const handleChange = (e) => {
    const value = e.target.value;
    setAccommodation({
      ...accommodation,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    if (accommodationId) {
      url = `http://localhost:8000/dashboard/accommodation/edit/${accommodationId}`
    } else {
      url = `http://localhost:8000/dashboard/accommodation`
    }

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
      user: userId,
      trip: tripId,
    };

    if (name === "" || contactNumber === "" || checkInDate === "" || checkOutDate === "" || checkInTime === "" || checkOutTime === "" || bookingReference === "") {
      setEmptyFields(['name', 'contactNumber', 'checkInDateInput', 'checkOutDateInput', 'checkInTimeInput', 'checkOutTimeInput', 'bookingReference'])
      return
    }

    await axios
      .post(url, newAccommodation)
      .then(() => {
        handleAlert("Accommodation added successfully.", "success");
        setAccommodation({
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
          user: userId,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
        handleAlert("Whoops! We couldn't add your flight, please try again.", "error");
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Accommodation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Accommodation. Fill in the fields to store your Accommodation
            details
          </DialogContentText>
          <TextField
            value={accommodation.name}
            inputProps={{ "data-testid": "name" }}
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Venue name"
            type="text"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('name') ? '1px solid red' : '' , borderRadius: "5px" }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.contactNumber}
            inputProps={{ "data-testid": "contactNumber" }}
            autoFocus
            margin="dense"
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            type="number"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('contactNumber') ? '1px solid red' : '' , borderRadius: "5px" }}
            onChange={handleChange}
          />
          <TextField
            value={formatDate(accommodation.checkInDate)}
            data-testid="checkInDate"
            inputProps={{ "data-testid": "checkInDateInput" }}
            autoFocus
            margin="dense"
            id="checkInDate"
            name="checkInDate"
            label="Check-in date"
            type="date"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('checkInDateInput') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={formatDate(accommodation.checkOutDate)}
            inputProps={{ "data-testid": "checkOutDateInput" }}
            data-testid="checkOutDate"
            autoFocus
            margin="dense"
            id="checkOutDate"
            name="checkOutDate"
            label="Check-out date"
            type="date"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('checkOutDateInput') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkInTime}
            inputProps={{ "data-testid": "checkInTimeInput" }}
            data-testid="checkInTime"
            autoFocus
            margin="dense"
            id="checkInTime"
            name="checkInTime"
            label="Check-in time"
            type="time"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('checkInTimeInput') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkOutTime}
            inputProps={{ "data-testid": "checkOutTimeInput" }}
            data-testid="checkOutTime"
            autoFocus
            margin="dense"
            id="checkOutTime"
            name="checkOutTime"
            label="Check-out time"
            type="time"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('checkOutTimeInput') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.bookingReference}
            inputProps={{ "data-testid": "bookingReference" }}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('bookingReference') ? '1px solid red' : '' , borderRadius: "5px" }}
            onChange={handleChange}
          />
          <div style={{display: openAddress ? "" : "none"}} >
            <TextField
              value={accommodation.buildingNumber}
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
              value={accommodation.buildingName}
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
              value={accommodation.addressLine1}
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
              value={accommodation.addressLine2}
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
              value={accommodation.city}
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
              value={accommodation.stateCounty}
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
              value={accommodation.postalCode}
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
              value={accommodation.countryCode}
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
          </div>
          <p className={"text-link"} onClick={handleExpand} style={{display: openAddress ? "none" : ""}}>+ add address</p>
          <p className={"text-link"} onClick={handleContract} style={{display: openAddress ? "" : "none"}} >- remove address</p>
        </DialogContent>
        <DialogActions>
        <Button id="default-cancel-button" onClick={handleClose}>Cancel</Button>
          <Button id="save-details-button" onClick={handleSubmit} data-testid="saveAccommodationDetails">
            Save Accommodation Details
          </Button>
          
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

export default AddAccommodation;