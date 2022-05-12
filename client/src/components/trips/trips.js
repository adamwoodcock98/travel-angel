import React, { useState, useEffect } from "react";
import ViewTrips from "./viewTrips/viewTrips";
import AddTrip from "./addTrip/addTrip";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./trips.css";

const Trips = ({ session }) => {
  const userId = session;
  const { tripId } = useParams;

  console.log("the trips rendering ----");

  const [trip, setTrip] = useState({
    name: "",
    startDate: "",
    endDate: "",
    user: userId,
  });
  const [open, setOpen] = useState(false);
  const [tripArray, setTripArray] = useState([]);

  useEffect(() => {
    if (userId !== "null") {
      axios.get(`http://localhost:8000/trips/${userId}`).then((res) => {
        setTripArray(res.data.trips);
      });
    } else {
    }
  }, [trip]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
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
      {!tripArray.length && <h2>Nothing here. Add your trip now!</h2>}
    </div>
  );
};

export default Trips;
