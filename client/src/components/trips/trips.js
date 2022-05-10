import React, { useState, useEffect } from "react";
import ViewTrips from "./viewTrips/viewTrips";
import AddTrip from "./addTrip/addTrip";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

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

  useEffect(() => {
    if (userId !== "null") {
      axios.get(`http://localhost:8000/trips/${userId}`).then((res) => {
        setTripArray(res.data.trips);
      });
    } else {
      console.log("not logged in");
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

  

  if (tripArray.length) {
    tripArray.sort(
      (trip1, trip2) => new Date(trip2.startDate) - new Date(trip1.startDate)
    )
    const tripCountdown = moment(tripArray[0].startDate, "YYYYMMDD").fromNow();
    const compareDates = new Date(tripArray[0].startDate) - new Date() > 0;

    return (
      <div className="container">
        <div className="header">
          <h1>Your Trips</h1>
          {compareDates && (<h2>The next trip is {tripCountdown}!</h2>)}
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
        <div className="trip-body">
          <ViewTrips trips={tripArray} />
        </div>
      </div>
      )
    } else {
      return (
      <div className="container">
      <h2>Nothing here. Add your trip now!</h2>
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
    )}
};

export default Trips;
