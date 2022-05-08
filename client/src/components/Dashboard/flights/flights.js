import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlightCard } from "./viewFlights/flightCard";
import "./flights.css";
import AddFlight from "./addFlight";
import { Alerts } from "../../assets/snackbar";

const Flights = ({ session }) => {
  const userId = session;

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
    isOutbound: "",
    user: userId,
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

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/flights/",
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

  const onSubmit = (e) => {
    e.preventDefault();

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
    };

    api.post("/", newFlight).then((res) => {
      handleClose();
      window.location = "/";
    });
  };

  useEffect(() => {
    api
      .get(`/${userId}`)
      .then((res) => {
        const outbound = res.data.outbound;
        const inbound = res.data.inbound;
        setOutboundFlight(outbound);
        setInboundFlight(inbound);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          handleAlert(
            error.response.status + " - " + error.response.statusText,
            "error"
          );
        } else {
          handleAlert(
            error.response.status + " - " + error.response.statusText,
            "error"
          );
        }
      });
  }, []);

  if (outboundFlight.length || inboundFlight.length) {
    const outboundFlights = [];
    const inboundFlights = [];

    outboundFlight.forEach((flight) => {
      outboundFlights.push(
        <FlightCard outboundFlight={flight} key={flight._id} />
      );
    });

    inboundFlight.forEach((flight) => {
      inboundFlights.push(
        <FlightCard outboundFlight={flight} key={flight._id} />
      );
    });

    return (
      <div className="flights-window">
        <div className="flights-header">
          <h1>Your flights</h1>
        </div>
        <div className="flights-content">
          <div className="flights-content-outbound">
            <h1 className="flights-content-subheading">Outbound</h1>
            {outboundFlight[0] && outboundFlights}
          </div>
          <div className="flights-content-inbound">
            <h1 className="flights-content-subheading">Inbound</h1>
            {inboundFlight[0] && inboundFlights}
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
    );
  } else {
    return (
      <>
        <AddFlight
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleChange={handleChange}
          flight={flight}
          onSubmit={onSubmit}
        />
        {alertMessage && (
          <Alerts
            message={alertMessage}
            open={alertOpen}
            handleClose={handleAlertClose}
            alertPosition={alertPosition}
            alertType={alertType}
          />
        )}
      </>
    );
  }
};

export default Flights;
