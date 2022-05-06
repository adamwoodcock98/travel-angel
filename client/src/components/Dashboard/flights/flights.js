import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FlightCard } from "./viewFlights/flightCard";
import "./flights.css"
import AddFlight from "./addFlight"


const Flights = () => {

  const [inboundFlight, setInboundFlight] = useState([]);
  const [outboundFlight, setOutboundFlight] = useState([]);
  const [open, setOpen] = useState(false);
  const [flight, setFlight] = useState({
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
    isOutbound: ""
  });

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/flights/"
  })

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

  const onSubmit = (e) => {
    e.preventDefault();

    const { flightNumber, departureTime, departureDate, airline, departureAirport, departureTerminal, departureCity, departureGate, arrivalAirport, arrivalTerminal, arrivalCity, arrivalGate, bookingReference, isOutbound } = flight;

    const newFlight = { flightNumber, departureTime, departureDate,  airline, departureAirport, departureTerminal, departureCity, departureGate, arrivalAirport, arrivalTerminal, arrivalCity, arrivalGate, bookingReference, isOutbound };

    api.post("/", newFlight).then(res => {
      handleClose();
      window.location = "/";
    });
  };

  useEffect(() => {
    api.get("/").then(res => {
      const outbound = res.data.outbound    
      const inbound = res.data.inbound
      setOutboundFlight(outbound);
      setInboundFlight(inbound);
    });
  }, [])

  if (outboundFlight.length || inboundFlight.length) {
    return(
      <div className="flights-window">
        <div className="flights-header">
          <h1>Your flights</h1>
        </div>
        <div className="flights-content">
          <div className="flights-content-outbound">
            <h1 className="flights-content-subheading">Outbound</h1>
            {outboundFlight[0] && <FlightCard outboundFlight={outboundFlight[0]} />}
          </div>
          <div className="flights-content-inbound">
            <h1 className="flights-content-subheading">Inbound</h1>
            {inboundFlight[0] && <FlightCard outboundFlight={inboundFlight[0]} />}
          </div>
        </div>
        <div className="flights-footer">
          <AddFlight
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleChange={handleChange}
            flight={flight}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    )
  } else {
    return(
      <>Loading</>
    )
  }
  
};

export default Flights; 
