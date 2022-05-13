import React, { useState } from "react";
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
import "../../assets/styling/cards.css";
import "../dashboard.css";

const AddParking = (props) => {
  const formatDateTime = (date) => moment(date).format("yyyy-MM-DDThh:mm");

  const userId = props.userId;
  const tripId = props.tripId;
  const open = props.open;
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const parkingData = props.parkingData;
  const parkingId = props.parkingId;
  const handleUpload = props.handleUpload;
  const [openAddress, setOpenAddress] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
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
    trip: tripId,
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleExpand = () => {
    setOpenAddress(true);
  };

  const handleContract = () => {
    setParking({
      startDate: parking.startDate,
      endDate: parking.endDate,
      airport: parking.airport,
      type: parking.type,
      regPlate: parking.regPlate,
      company: parking.company,
      contactNumber: parking.contactNumber,
      bookingReference: parking.bookingReference,
      notes: parking.notes,
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
    setOpenAddress(false);
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
    setParking({
      ...parking,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let url;
    if (parkingId) {
      url = `http://localhost:8000/dashboard/parking/edit/${parkingId}`;
    } else {
      url = `http://localhost:8000/dashboard/parking/`;
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
      trip: tripId,
    };

    if (
      startDate === "" ||
      endDate === "" ||
      addressLine1 === "" ||
      city === "" ||
      postalCode === ""
    ) {
      setEmptyFields([
        "startDate",
        "endDate",
        "addressLine1",
        "city",
        "postalCode",
      ]);
      return;
    }

    axios
      .post(url, newBooking)
      .then((res) => {
        handleAlert("Parking added successfully.", "success");
        handleClose();
        handleUpload();
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
      })
      .catch((err) => {
        console.log(err.message);
        handleAlert(
          "Whoops! We couldn't add your parking, please try again.",
          "error"
        );
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary">Add parking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use this form to store your parking information
          </DialogContentText>
          <TextField
            value={formatDateTime(parking.startDate)}
            autoFocus
            margin="dense"
            id="startDate"
            name="startDate"
            label="Start Date & Time"
            type="datetime-local"
            variant="outlined"
            required
            sx={{
              border: emptyFields.includes("startDate") ? "1px solid red" : "",
              borderRadius: "5px",
              maxWidth: 195,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={formatDateTime(parking.endDate)}
            autoFocus
            margin="dense"
            id="endDate"
            name="endDate"
            label="End Date & Time"
            type="datetime-local"
            variant="outlined"
            required
            sx={{
              border: emptyFields.includes("endDate") ? "1px solid red" : "",
              borderRadius: "5px",
              maxWidth: 195,
              m: 1,
            }}
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
            sx={{ m: 1 }}
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
            sx={{ m: 1 }}
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
            sx={{ m: 1 }}
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
          <div style={{ display: openAddress ? "" : "none" }}>
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
              sx={{ m: 1 }}
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
              sx={{
                border: emptyFields.includes("addressLine1")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handleChange}
            />
            <TextField
              value={parking.addressLine2}
              inputProps={{ "data-testid": "addressLine2" }}
              autoFocus
              margin="dense"
              id="addressLine2"
              name="addressLine2"
              sx={{ m: 1 }}
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
              sx={{
                border: emptyFields.includes("city") ? "1px solid red" : "",
                borderRadius: "5px",
              }}
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
              sx={{ m: 1 }}
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
              sx={{
                border: emptyFields.includes("postalCode")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handleChange}
            />
            <TextField
              value={parking.countryCode}
              inputProps={{ "data-testid": "countryCode" }}
              autoFocus
              margin="dense"
              id="countryCode"
              name="countryCode"
              sx={{ m: 1 }}
              label="Country"
              type="text"
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <p
            className={"text-link"}
            onClick={handleExpand}
            style={{ display: openAddress ? "none" : "" }}
          >
            + add address
          </p>
          <p
            className={"text-link"}
            onClick={handleContract}
            style={{ display: openAddress ? "" : "none" }}
          >
            - remove address
          </p>
        </DialogContent>
        <DialogActions>
          <Button id="default-cancel-button" onClick={handleClose}>
            Cancel
          </Button>
          {!parkingId && (
            <Button
              id="save-details-button"
              variant="outlined"
              onClick={onSubmit}
            >
              Save
            </Button>
          )}
          {parkingId && (
            <Button
              id="save-details-button"
              variant="outlined"
              onClick={onSubmit}
            >
              Update
            </Button>
          )}
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
};

export default AddParking;
