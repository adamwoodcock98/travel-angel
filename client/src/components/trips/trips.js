import React, { useState, useEffect } from "react";
import ViewTrips from "./viewTrips/viewTrips";
import AddTrip from "./addTrip/addTrip";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./trips.css";
import { Alerts } from "../assets/snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const Trips = ({ session }) => {
  const userId = session;
  const { tripId } = useParams;

  const [trip, setTrip] = useState({
    name: "",
    startDate: "",
    endDate: "",
    user: userId,
  });
  const [open, setOpen] = useState(false);
  const [tripArray, setTripArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [didUpdate, setDidUpdate] = useState(false);
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

  useEffect(() => {
    setLoadingFailed(false);
    setLoading(true);
    if (userId !== "null") {
      axios.get(`http://localhost:8000/trips/${userId}`).then((res) => {
        setTripArray(res.data.trips);
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
      .finally(() => setLoading(false));;
    } else {
    }
  }, [didUpdate]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDidUpdate(!didUpdate);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTrip({
      ...trip,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, startDate, endDate, user } = trip;

    const newTrip = {
      name,
      startDate,
      endDate,
      user,
    };

    await axios
      .post("http://localhost:8000/trips/", newTrip)
      .catch((err) => console.log(err.message))
      .then(() => {
        setTrip({
          name: "",
          startDate: "",
          endDate: "",
          user: userId,
        });
        handleClose();
      });
  };

  const isExpired = (trip) => new Date(trip.startDate) - new Date() < 0;

  const expiredTrips = tripArray
    .filter((trip) => isExpired(trip))
    .sort(
      (trip1, trip2) => new Date(trip2.startDate) - new Date(trip1.startDate)
    );

  const upcomingTrips = tripArray
    .filter((trip) => !expiredTrips.includes(trip))
    .sort(
      (trip1, trip2) => new Date(trip1.startDate) - new Date(trip2.startDate)
    );

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
    } else return (
    <div className="trip-container">
      <div className="trip-header">
        <h1 className="trip-h1">Trips</h1>
        <AddTrip
          className="add-accomodation"
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          trip={trip}
          handleSubmit={handleSubmit}
        />
      </div>
      {tripArray.length && (
        <div className="trip-body">
          {upcomingTrips.length > 0 && (
            <h2 className="countdown">
              Your next trip is{" "}
              {moment(upcomingTrips[0].startDate, "YYYYMMDD").fromNow()}
            </h2>
          )}
          <ViewTrips trips={upcomingTrips} />
          <div id="expired">
            <ViewTrips trips={expiredTrips} />
          </div>
        </div>
      )}
      {!tripArray.length &&
      <div className="empty-prompt">
        <h3>Looks like you don't have any saved flights</h3>
        <h2>Press + to get started</h2>
      </div>
      }
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

export default Trips;
