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
import moment from "moment";

const AddFlight = ({
  flightData,
  tripId,
  flightId,
  open,
  userId,
  handleClose,
  handleUpload,
}) => {
  const [flight, setFlight] = useState({
    flightNumber: flightData.flightNumber,
    departureTime: flightData.departureTime,
    departureDate: flightData.departureDate,
    airline: flightData.airline,
    departureAirport: flightData.departureAirport,
    departureTerminal: flightData.departureTerminal,
    departureCity: flightData.departureCity,
    departureGate: flightData.departureGate,
    arrivalAirport: flightData.arrivalAirport,
    arrivalTerminal: flightData.arrivalTerminal,
    arrivalCity: flightData.arrivalCity,
    arrivalGate: flightData.arrivalGate,
    bookingReference: flightData.bookingReference,
    isOutbound: flightData.isOutbound,
    user: userId,
    trip: tripId,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setFlight({
      ...flight,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let url;
    if (flightId) {
      url = `http://localhost:8000/dashboard/flights/edit/${flightId}`;
    } else {
      url = `http://localhost:8000/dashboard/flights/`;
    }

    const {
      flightNumber,
      departureTime,
      departureDate,
      airline,
      departureAirport,
      departureTerminal,
      departureCity,
      departureGate,
      arrivalAirport,
      arrivalTerminal,
      arrivalCity,
      arrivalGate,
      bookingReference,
      isOutbound,
      user,
      trip,
    } = flight;

    const newFlight = {
      flightNumber,
      departureTime,
      departureDate,
      airline,
      departureAirport,
      departureTerminal,
      departureCity,
      departureGate,
      arrivalAirport,
      arrivalTerminal,
      arrivalCity,
      arrivalGate,
      bookingReference,
      isOutbound,
      user,
      trip,
    };

    axios.post(url, newFlight).then((res) => {
      handleClose();
      handleUpload();
      setFlight({
        flightNumber: "",
        departureTime: "",
        departureDate: "",
        airline: "",
        departureAirport: "",
        departureTerminal: "",
        departureCity: "",
        departureGate: "",
        arrivalAirport: "",
        arrivalTerminal: "",
        arrivalCity: "",
        arrivalGate: "",
        bookingReference: "",
        isOutbound: "",
        user: userId,
        trip: tripId,
      });
      handleClear();
    });
  };

  const handleClear = () => {
    setFlight({
      flightNumber: "",
      departureTime: "",
      departureDate: "",
      airline: "",
      departureAirport: "",
      departureTerminal: "",
      departureCity: "",
      departureGate: "",
      arrivalAirport: "",
      arrivalTerminal: "",
      arrivalCity: "",
      arrivalGate: "",
      bookingReference: "",
      isOutbound: "",
    });
  };

  const formatDate = (date) => moment(date).format("YYYY-MM-DD");
  const formatTime = (time) => moment(time).format("hh:mm");
  const flightNumber = flight.flightNumber;
  const flightDate = formatDate(flight.departureDate);
  // console.log(flightNumber)
  // console.log(flightDate)

  const options = {
    headers: {
      "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_FLIGHT_API_KEY,
    },
  };
  const flightApi = axios.create({
    baseURL: `https://aerodatabox.p.rapidapi.com/flights/number/${flightNumber}/${flightDate}/`,
  });

  const handleApiSearch = async () => {
    await flightApi.get("/", options).then((res) => {
      const data = res.data[0];
      console.log(res.data);

      setFlight({
        ...flight,
        departureTime: formatTime(data.departure.scheduledTimeLocal),
        airline: data.airline.name,
        departureAirport: data.departure.airport.shortName,
        departureTerminal: data.departure.terminal,
        departureCity: data.departure.airport.municipalityName,
        departureGate: data.departure.gate,
        arrivalAirport: data.arrival.airport.name,
        arrivalTerminal: data.arrival.terminal,
        arrivalCity: data.arrival.airport.municipalityName,
        arrivalGate: data.arrival.gate,
        trip: tripId,
        user: userId,
      });
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Flight</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store your flight details
          </DialogContentText>
          <TextField
            value={flight.flightNumber}
            autoFocus
            margin="dense"
            id="flightNumber"
            name="flightNumber"
            label="Flight Number"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={formatDate(flight.departureDate)}
            autoFocus
            margin="dense"
            id="departureDate"
            name="departureDate"
            label="Date"
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
          <Button onClick={handleApiSearch}>Search</Button>
        </DialogActions>

        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 190 }}>
            <InputLabel id="demo-select-small">Journey Type</InputLabel>
            <Select
              value={flight.isOutbound}
              autoFocus
              margin="dense"
              id="isOutbound"
              name="isOutbound"
              label="Journey type"
              variant="outlined"
              onChange={handleChange}
              required
            >
              <MenuItem value={false}>Inbound</MenuItem>
              <MenuItem value={true}>Outbound</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={flight.departureTime}
            autoFocus
            margin="dense"
            id="departureTime"
            name="departureTime"
            label="Time"
            type="time"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />

          <TextField
            value={flight.airline}
            autoFocus
            margin="dense"
            id="airline"
            name="airline"
            label="Airline"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.departureAirport}
            autoFocus
            margin="dense"
            id="departureAirport"
            name="departureAirport"
            label="Departure Airport"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={flight.departureTerminal}
            autoFocus
            margin="dense"
            id="departureTerminal"
            name="departureTerminal"
            label="Departure Terminal"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.departureCity}
            autoFocus
            margin="dense"
            id="departureCity"
            name="departureCity"
            label="Departure City"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={flight.departureGate}
            autoFocus
            margin="dense"
            id="departureGate"
            name="departureGate"
            label="Departure Gate"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.arrivalAirport}
            autoFocus
            margin="dense"
            id="arrivalAirport"
            name="arrivalAirport"
            label="Arrival Airport"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={flight.arrivalTerminal}
            autoFocus
            margin="dense"
            id="arrivalTerminal"
            name="arrivalTerminal"
            label="Arrival Terminal"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.arrivalCity}
            autoFocus
            margin="dense"
            id="arrivalCity"
            name="arrivalCity"
            label="Arrival City"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={flight.arrivalGate}
            autoFocus
            margin="dense"
            id="arrivalGate"
            name="arrivalGate"
            label="Arrival Gate"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.bookingReference}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          {flightId && (
            <Button onClick={onSubmit}>Update Flight Details</Button>
          )}
          {!flightId && <Button onClick={onSubmit}>Save Flight Details</Button>}
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFlight;
