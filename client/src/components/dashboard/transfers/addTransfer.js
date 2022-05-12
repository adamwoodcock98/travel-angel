import React, { useState } from "react";
import axios from "axios";
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
import { getThemeProps } from "@mui/system";
import { Alerts } from "../../assets/snackbar";
import moment from "moment";
import "../dashboard.css";

const AddTransfer = (props) => {
  const userId = props.userId;
  const tripId = props.tripId;
  const transferId = props.transferId;
  const open = props.open;
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const transferData = props.transferData;
  const [emptyFields, setEmptyFields] = useState([]);
  const [transfer, setTransfer] = useState({
    pickupTime: transferData.pickupTime,
    dropoffTime: transferData.dropoffTime,
    pickupAddress: {
      buildingNumber: transferData.pickupAddress.buildingNumber,
      buildingName: transferData.pickupAddress.buildingName,
      addressLine1: transferData.pickupAddress.addressLine1,
      addressLine2: transferData.pickupAddress.addressLine2,
      city: transferData.pickupAddress.city,
      postalCode: transferData.pickupAddress.postalCode,
      stateCounty: transferData.pickupAddress.stateCounty,
      countryCode: transferData.pickupAddress.countryCode,
    },
    dropoffAddress: {
      buildingNumber: transferData.dropoffAddress.buildingNumber,
      buildingName: transferData.dropoffAddress.buildingName,
      addressLine1: transferData.dropoffAddress.addressLine1,
      addressLine2: transferData.dropoffAddress.addressLine2,
      city: transferData.dropoffAddress.city,
      postalCode: transferData.dropoffAddress.postalCode,
      stateCounty: transferData.dropoffAddress.stateCounty,
      countryCode: transferData.dropoffAddress.countryCode,
    },
    isOutbound: transferData.isOutbound,
    company: transferData.company,
    contactNumber: transferData.contactNumber,
    bookingReference: transferData.bookingReference,
    user: userId,
    trip: tripId,
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openPickup, setOpenPickup] = useState(false);
  const [openDropoff, setOpenDropoff] = useState(false);
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

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setTransfer((prevState) => ({
      ...prevState,
      pickupAddress: {
        ...prevState.pickupAddress,
        [e.target.name]: value,
      },
    }));
  };

  const handleDropoffChange = (e) => {
    const value = e.target.value;
    setTransfer((prevState) => ({
      ...prevState,
      dropoffAddress: {
        ...prevState.dropoffAddress,
        [e.target.name]: value,
      },
    }));
  };

  const handleDropoffExpand = () => {
    setOpenDropoff(true);
  };

  const handleDropoffContract = () => {
    setOpenDropoff(false);
    setTransfer({
      pickupTime: transfer.pickupTime,
      dropoffTime: transfer.dropoffTime,
      pickupAddress: {
        buildingNumber: transfer.pickupAddress.buildingNumber,
        buildingName: transfer.pickupAddress.buildingName,
        addressLine1: transfer.pickupAddress.addressLine1,
        addressLine2: transfer.pickupAddress.addressLine2,
        city: transfer.pickupAddress.city,
        postalCode: transfer.pickupAddress.postalCode,
        stateCounty: transfer.pickupAddress.stateCounty,
        countryCode: transfer.pickupAddress.countryCode,
      },
      dropoffAddress: {
        buildingNumber: "",
        buildingName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        stateCounty: "",
        countryCode: "",
      },
      isOutbound: transfer.isOutbound,
      company: transfer.company,
      contactNumber: transfer.contactNumber,
      bookingReference: transfer.bookingReference,
      user: userId,
      trip: tripId,
    });
  };

  const handlePickupExpand = () => {
    setOpenPickup(true);
  };

  const handlePickupContract = () => {
    setOpenPickup(false);
    setTransfer({
      pickupTime: transfer.pickupTime,
      dropoffTime: transfer.dropoffTime,
      pickupAddress: {
        buildingNumber: "",
        buildingName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        stateCounty: "",
        countryCode: "",
      },
      dropoffAddress: {
        buildingNumber: transfer.dropoffAddress.buildingNumber,
        buildingName: transfer.dropoffAddress.buildingName,
        addressLine1: transfer.dropoffAddress.addressLine1,
        addressLine2: transfer.dropoffAddress.addressLine2,
        city: transfer.dropoffAddress.city,
        postalCode: transfer.dropoffAddress.postalCode,
        stateCounty: transfer.dropoffAddress.stateCounty,
        countryCode: transfer.dropoffAddress.countryCode,
      },
      isOutbound: transfer.isOutbound,
      company: transfer.company,
      contactNumber: transfer.contactNumber,
      bookingReference: transfer.bookingReference,
      user: userId,
      trip: tripId,
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTransfer({
      ...transfer,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url;
    if (transferId) {
      url = `http://localhost:8000/dashboard/transfers/edit/${transferId}`;
    } else {
      url = `http://localhost:8000/dashboard/transfers/`;
    }

    const {
      pickupTime,
      dropoffTime,
      pickupAddress,
      dropoffAddress,
      isOutbound,
      company,
      contactNumber,
      bookingReference,
      user,
      trip,
    } = transfer;

    const newTransfer = {
      pickupTime,
      dropoffTime,
      pickupAddress,
      dropoffAddress,
      isOutbound,
      company,
      contactNumber,
      bookingReference,
      user,
      trip,
    };

    if (
      company === "" ||
      contactNumber === "" ||
      pickupTime === "" ||
      dropoffTime === "" ||
      pickupAddress.addressLine1 === "" ||
      pickupAddress.city === "" ||
      pickupAddress.postalCode === "" ||
      dropoffAddress.addressLine1 === "" ||
      dropoffAddress.city === "" ||
      dropoffAddress.postalCode === "" ||
      isOutbound === ""
    ) {
      setEmptyFields([
        "company",
        "contactNumber",
        "pickupTime",
        "dropoffTime",
        "pickupAddress.addressLine1",
        "pickupAddress.city",
        "pickupAddress.postalCode",
        "dropoffAddress.addressLine1",
        "dropoffAddress.city",
        "dropoffAddress.postalCode",
        "isOutbound",
      ]);
      return;
    }

    axios
      .post(url, newTransfer)
      .then(() => {
        handleAlert("Transfer added successfully", "success")
        handleClose()
        setTransfer({
          pickupTime: "",
          dropoffTime: "",
          pickupAddress: {
            buildingNumber: "",
            buildingName: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            postalCode: "",
            stateCounty: "",
            countryCode: "",
          },
          dropoffAddress: {
            buildingNumber: "",
            buildingName: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            postalCode: "",
            stateCounty: "",
            countryCode: "",
          },
          isOutbound: "",
          company: "",
          contactNumber: "",
          bookingReference: "",
          user: userId,
          trip: tripId,
        });
        handleClose();
      })
      .catch(() => {
        handleAlert(
          "Whoops! We couldn't add your transfer, please try again.",
          "error"
        );
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary">Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use this form to store your transfer details.
          </DialogContentText>
          <TextField
            value={transfer.bookingReference}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <FormControl sx={{ m: 1, minWidth: 195 }}>
            <InputLabel>Journey Type</InputLabel>
            <Select
              value={transfer.isOutbound}
              autoFocus
              margin="dense"
              id="isOutbound"
              name="isOutbound"
              label="Journey type"
              variant="outlined"
              required
              sx={{
                border: emptyFields.includes("isOutbound")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handleChange}
            >
              <MenuItem value={false}>Inbound</MenuItem>
              <MenuItem value={true}>Outbound</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={transfer.company}
            autoFocus
            margin="dense"
            id="company"
            name="company"
            label="Company"
            type="text"
            variant="outlined"
            required
            sx={{
              border: emptyFields.includes("company") ? "1px solid red" : "",
              borderRadius: "5px",
            }}
            onChange={handleChange}
          />
          <TextField
            value={transfer.contactNumber}
            autoFocus
            margin="dense"
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            type="text"
            variant="outlined"
            required
            sx={{
              border: emptyFields.includes("contactNumber")
                ? "1px solid red"
                : "",
              borderRadius: "5px",
              m: 1,
            }}
            onChange={handleChange}
          />
          <TextField
            value={transfer.pickupTime}
            autoFocus
            margin="dense"
            id="pickupTime"
            name="pickupTime"
            label="Pickup Date and Time"
            type="datetime-local"
            variant="outlined"
            required
            sx={{
              border: emptyFields.includes("pickupTime") ? "1px solid red" : "",
              borderRadius: "5px",
              maxWidth: 195,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />

          <TextField
            value={transfer.dropoffTime}
            autoFocus
            margin="dense"
            id="dropoffTime"
            name="dropoffTime"
            label="Dropoff Date and Time"
            type="datetime-local"
            variant="outlined"
            required
            sx={{
              border: emptyFields.includes("dropoffTime")
                ? "1px solid red"
                : "",
              borderRadius: "5px",
              maxWidth: 195,
              m: 1,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <div style={{ display: openPickup ? "" : "none" }}>
            <DialogContentText color="secondary">Pickup Address</DialogContentText>
            <TextField
              value={transfer.pickupAddress.buildingNumber}
              autoFocus
              margin="dense"
              id="buildingNumber"
              name="buildingNumber"
              label="Building Number"
              type="text"
              variant="outlined"
              onChange={handlePickupChange}
            />
            <TextField
              value={transfer.pickupAddress.buildingName}
              autoFocus
              margin="dense"
              id="buildingName"
              name="buildingName"
              label="Building Name"
              type="text"
              variant="outlined"
              sx={{m: 1}}
              onChange={handlePickupChange}
            />
            <TextField
              value={transfer.pickupAddress.addressLine1}
              autoFocus
              margin="dense"
              id="addressLine1"
              name="addressLine1"
              label="Address Line 1"
              type="text"
              variant="outlined"
              required
              sx={{
                border: emptyFields.includes("pickupAddress.addressLine1")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handlePickupChange}
            />
            <TextField
              value={transfer.pickupAddress.addressLine2}
              autoFocus
              margin="dense"
              id="addressLine2"
              name="addressLine2"
              sx={{m: 1}}
              label="Address Line 2"
              type="text"
              variant="outlined"
              onChange={handlePickupChange}
            />
            <TextField
              value={transfer.pickupAddress.city}
              autoFocus
              margin="dense"
              id="city"
              name="city"
              label="City"
              type="text"
              variant="outlined"
              required
              sx={{
                border: emptyFields.includes("pickupAddress.city")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handlePickupChange}
            />
            <TextField
              value={transfer.pickupAddress.stateCounty}
              autoFocus
              margin="dense"
              id="stateCounty"
              name="stateCounty"
              label="State/Province"
              sx={{m: 1}}
              type="text"
              variant="outlined"
              onChange={handlePickupChange}
            />
            <TextField
              value={transfer.pickupAddress.postalCode}
              autoFocus
              margin="dense"
              id="postalCode"
              name="postalCode"
              label="Postal/Zip Code"
              type="text"
              variant="outlined"
              required
              sx={{
                border: emptyFields.includes("pickupAddress.postalCode")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handlePickupChange}
            />
            <TextField
              value={transfer.pickupAddress.countryCode}
              autoFocus
              margin="dense"
              id="countryCode"
              name="countryCode"
              label="Country"
              sx={{m: 1}}
              type="text"
              variant="outlined"
              onChange={handlePickupChange}
            />
          </div>
          <p
            className={"text-link"}
            onClick={handlePickupExpand}
            style={{ display: openPickup ? "none" : "" }}
          >
            + add pickup address
          </p>
          
          <p
            className={"text-link"}
            onClick={handlePickupContract}
            style={{ display: openPickup ? "" : "none" }}
          >
            - remove pickup address
          </p>
            <DialogContent />
          <div style={{ display: openDropoff ? "" : "none" }}>
            <DialogContentText color="primary">Dropoff Address</DialogContentText>
            <TextField
              value={transfer.dropoffAddress.buildingNumber}
              autoFocus
              margin="dense"
              id="buildingNumber"
              name="buildingNumber"
              label="Building Number"
              type="text"
              variant="outlined"
              onChange={handleDropoffChange}
            />
            <TextField
              value={transfer.dropoffAddress.buildingName}
              autoFocus
              margin="dense"
              id="buildingName"
              name="buildingName"
              label="Building Name"
              sx={{m: 1}}
              type="text"
              variant="outlined"
              onChange={handleDropoffChange}
            />
            <TextField
              value={transfer.dropoffAddress.addressLine1}
              autoFocus
              margin="dense"
              id="addressLine1"
              name="addressLine1"
              label="Address Line 1"
              type="text"
              variant="outlined"
              required
              sx={{
                border: emptyFields.includes("dropoffAddress.addressLine1")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handleDropoffChange}
            />
            <TextField
              value={transfer.dropoffAddress.addressLine2}
              autoFocus
              margin="dense"
              id="addressLine2"
              name="addressLine2"
              label="Address Line 2"
              sx={{m: 1}}
              type="text"
              variant="outlined"
              onChange={handleDropoffChange}
            />
            <TextField
              value={transfer.dropoffAddress.city}
              autoFocus
              margin="dense"
              id="city"
              name="city"
              label="City"
              type="text"
              variant="outlined"
              required
              sx={{
                border: emptyFields.includes("dropoffAddress.city")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handleDropoffChange}
            />
            <TextField
              value={transfer.dropoffAddress.stateCounty}
              autoFocus
              margin="dense"
              id="stateCounty"
              name="stateCounty"
              label="State/Province"
              sx={{m: 1}}
              type="text"
              variant="outlined"
              onChange={handleDropoffChange}
            />
            <TextField
              value={transfer.dropoffAddress.postalCode}
              autoFocus
              margin="dense"
              id="postalCode"
              name="postalCode"
              label="Postal/Zip Code"
              type="text"
              variant="outlined"
              required
              sx={{
                border: emptyFields.includes("dropoffAddress.postalCode")
                  ? "1px solid red"
                  : "",
                borderRadius: "5px",
              }}
              onChange={handleDropoffChange}
            />
            <TextField
              value={transfer.dropoffAddress.countryCode}
              autoFocus
              margin="dense"
              id="countryCode"
              name="countryCode"
              label="Country"
              type="text"
              sx={{m: 1}}
              variant="outlined"
              onChange={handleDropoffChange}
            />
          </div>
          <p
            className={"text-link"}
            onClick={handleDropoffExpand}
            style={{ display: openDropoff ? "none" : "" }}
          >
            + add dropoff address
          </p>
          <p
            className={"text-link"}
            onClick={handleDropoffContract}
            style={{ display: openDropoff ? "" : "none" }}
          >
            - remove dropoff address
          </p>
        </DialogContent>
        <DialogActions>
          <Button id="default-cancel-button" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="save-details-button" variant="outlined" onClick={handleSubmit}>
            Save
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
};

export default AddTransfer;
