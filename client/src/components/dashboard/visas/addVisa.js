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

const AddVisa = (props) => {

  const formatDate = (date) => moment(date).format("yyyy-MM-DD");

  const userId = props.userId;
  const tripId = props.tripId;
  const visaId = props.visaId;
  const emptyFields = props.emptyFields
  const open = props.open;
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const visaData = props.visaData;
  const [visa, setVisa] = useState({
    visaNumber: visaData.visaNumber,
    startDate: visaData.startDate,
    endDate: visaData.endDate,
    issuingCountry: visaData.issuingCountry,
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

  const handleChange = (e) => {
    const value = e.target.value;
    setVisa({
      ...visa,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    if (visaId) {
      url = `http://localhost:8000/dashboard/visas/edit/${visaId}`
    } else {
      url = `http://localhost:8000/dashboard/visas/`
    }

    const { visaNumber, startDate, endDate, issuingCountry } =
      visa;

    const newVisa = {
      visaNumber,
      startDate,
      endDate,
      issuingCountry,
      user: userId,
      trip: tripId,
    };

    await axios
      .post(url, newVisa)
      .then(() => {
        handleAlert("Visa added successfully.", "success");
        setVisa({
          visaNumber: "",
          startDate: "",
          endDate: "",
          issuingCountry: "",
          user: userId,
          trip: tripId,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
        handleAlert("Whoops! We couldn't add your visa, please try again.", "error");
      });;;
  };

  return (
    <div>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Visa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store your visa details
          </DialogContentText>
          <TextField
            value={visa.visaNumber}
            autoFocus
            margin="dense"
            id="visaNumber"
            name="visaNumber"
            label="Visa Number"
            type="text"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('visaNumber') ? '1px solid red' : '' , borderRadius: "5px" }}
            onChange={handleChange}
          />
          <TextField
            value={formatDate(visa.startDate)}
            autoFocus
            margin="dense"
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('startDate') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={formatDate(visa.endDate)}
            autoFocus
            margin="dense"
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('endDate') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={visa.issuingCountry}
            autoFocus
            margin="dense"
            id="issuingCountry"
            name="issuingCountry"
            label="Issuing Country"
            type="string"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('issuingCountry') ? '1px solid red' : '' , borderRadius: "5px" }}
            onChange={handleChange}
          />  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Save Visa Details</Button>
          <Button onClick={handleClose}>Cancel</Button>
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

export default AddVisa;