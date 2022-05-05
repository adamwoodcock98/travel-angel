import AddFlight from './addFlight.js';
import { useState } from 'react';
import axios from "axios";

const Flights = () => {
  const [open, setOpen] = useState(false);
  const [flight, setFlight] = useState({
    flightNumber: "",
    flightTime: "",
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
    isOutbound: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setFlight({
      ...flight,
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

    const { flightNumber, flightTime, airline, departureAirport, departureTerminal, departureCity, departureGate, arrivalAirport, arrivalTerminal, arrivalCity, arrivalGate, bookingReference, isOutbound } = flight;

    const newFlight = { flightNumber, flightTime, airline, departureAirport, departureTerminal, departureCity, departureGate, arrivalAirport, arrivalTerminal, arrivalCity, arrivalGate, bookingReference, isOutbound };

    await axios.post("http://localhost:8000/dashboard/flights/", newFlight).then(() => {
      handleClose();
      window.location = "/";
    });
  };

  return (
    <div className="Flights">
      <AddFlight
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        flight={flight}
        onSubmit={onSubmit}
      />
    </div>
  );
};
    
export default Flights;