import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlightCard } from "./viewFlights/flightCard";
import "./flights.css";
import AddFlight from "./addFlight";
import { Alerts } from "../../assets/snackbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import "../../assets/styling/cards.css";
import Button from "@mui/material/Button";

const Flights = ({ session }) => {
  const { tripId } = useParams();
  const [state, setState] = useState(0);
  const userId = session;
  const [inboundFlight, setInboundFlight] = useState([]);
  const [outboundFlight, setOutboundFlight] = useState([]);
  const [open, setOpen] = useState(false);
  const [didUpdate, setDidUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
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

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/flights/",
  });

  const handleUpload = async () => {
    setState((prev) => prev + 1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDidUpdate(!didUpdate);
  };

  useEffect(() => {
    setLoadingFailed(false);
    setLoading(true);
    api
      .get(`/${userId}/${tripId}`)
      .then((res) => {
        const outbound = res.data.outbound;
        const inbound = res.data.inbound;
        setOutboundFlight(outbound);
        setInboundFlight(inbound);
      })
      .catch((error) => {
        if (error.response.status) {
          handleAlert(
            error.response.status + " - " + error.response.statusText,
            "error"
          );
        } else {
          handleAlert("There was a problem connecting to the server.", "error");
          setLoadingFailed(true);
        }
      })
      .finally(() => setLoading(false));
  }, [didUpdate, state]);

  if (loadingFailed) {
    return (
      <div className="empty-window">
        <h1>Flights</h1>
        <div className="empty-prompt">
          <h3>This connection doesn't seem quite right</h3>
          <h2>:(</h2>
          <br />
          <Button onClick={handleClose} variant="outlined" color="primary">
            try again
          </Button>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className="loading" style={{ display: loading ? "" : "none" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  } else if (outboundFlight.length || inboundFlight.length) {
    const outboundFlights = [];
    const inboundFlights = [];

    outboundFlight.forEach((flight) => {
      outboundFlights.push(
        <FlightCard
          outboundFlight={flight}
          key={flight._id}
          userId={userId}
          refresh={handleClose}
          tripId={tripId}
          handleUpload={handleUpload}
        />
      );
    });

    inboundFlight.forEach((flight) => {
      inboundFlights.push(
        <FlightCard
          outboundFlight={flight}
          key={flight._id}
          userId={userId}
          refresh={handleClose}
          tripId={tripId}
          handleUpload={handleUpload}
        />
      );
    });

    return (
      <>
        <div
          className="flights-window"
          style={{ display: loading ? "none" : "" }}
        >
          <div className="flights-header">
            <h1>Flights</h1>
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
            <div id="fab-card-position">
              <Fab
                size="large"
                color="secondary"
                aria-label="add"
                onClick={handleOpen}
              >
                <AddIcon />
              </Fab>
            </div>
            <AddFlight
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              flightData={flight}
              flightId={null}
              userId={userId}
              tripId={tripId}
              handleUpload={handleUpload}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="empty-window">
        <h1>Flights</h1>
        <div className="empty-prompt">
          <h3>Looks like you don't have any saved flights</h3>
          <h2>Press + to get started</h2>
        </div>
        <AddFlight
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          flightData={flight}
          flightId={null}
          userId={userId}
          tripId={tripId}
          handleUpload={handleUpload}
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
        <div id="fab-card-position">
          <Fab
            size="large"
            color="secondary"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
};

export default Flights;
