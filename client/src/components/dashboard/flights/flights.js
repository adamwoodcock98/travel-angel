import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlightCard } from "./viewFlights/flightCard";
import "./flights.css";
import AddFlight from "./addFlight";
import { Alerts } from "../../assets/snackbar";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router-dom";
import moment from "moment";

const Flights = ({ session }) => {
  const { tripId } = useParams();

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

    api.post("/", newFlight).then((res) => {
      handleClose();
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
      window.location = "/";
    });
  };

  useEffect(() => {
    api
      .get(`/${userId}/${tripId}`)
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
      user: userId,
    })
  }
    
  const formatDate = (date) => moment(date).format("YYYY-MM-DD");
  const formatTime = (time) => moment(time).format("hh:mm");
    const flightNumber = flight.flightNumber;
    const flightDate = formatDate(flight.departureDate);
    // console.log(flightNumber)
    // console.log(flightDate)

    const options = {
      headers: {
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_FLIGHT_API_KEY,
      }
    }
    const flightApi = axios.create({
      baseURL: `https://aerodatabox.p.rapidapi.com/flights/number/${flightNumber}/${flightDate}/`
    });

      const handleApiSearch = async () => {
        await flightApi.get('/', options).then((res) => {
          const data  = res.data[0]
          console.log(data.departure)
  
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
          })
      })
      }

  if (outboundFlight.length || inboundFlight.length) {
    const outboundFlights = [];
    const inboundFlights = [];

    outboundFlight.forEach((flight) => {
      outboundFlights.push(
        <FlightCard outboundFlight={flight} key={flight._id} userId={userId} />
      );
    });

    inboundFlight.forEach((flight) => {
      inboundFlights.push(
        <FlightCard outboundFlight={flight} key={flight._id} userId={userId} />
      );
    })

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
          <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
          <AddFlight
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            flightData={flight}
            flightId={null}
            user={userId}
            tripId={tripId}
            handleApiSearch={handleApiSearch}
            handleClear={handleClear}
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <AddFlight
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          flightData={flight}
          flightId={null}
          user={userId}
          tripId={tripId}
          handleApiSearch={handleApiSearch}
          handleClear={handleClear}
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
    )}
};

export default Flights;
