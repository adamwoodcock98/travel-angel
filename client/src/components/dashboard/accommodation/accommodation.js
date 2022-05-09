import axios from "axios";
import React, { useState, useEffect } from "react";
import AccommodationCard from "./accommodationCard";
import AddAccommodation from "./addAccommodation";
import { useParams } from "react-router-dom";
import "./accommodation.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export const ViewAccommodation = ({ session }) => {
  const { tripId } = useParams();

  const userId = session;

  const [accommodation, setAccommodation] = useState([]);
  const [open, setOpen] = useState(false);
  const accommodationArray = {
    name: "",
    contactNumber: "",
    checkInDate: "",
    checkOutDate: "",
    checkInTime: "",
    checkOutTime: "",
    bookingReference: "",
    address: {
      buildingNumber: "",
      buildingName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      stateCounty: "",
      countryCode: "",
    },
    user: userId,
    trip: tripId,
  };

  useEffect(() => {
    if (userId !== "null") {
      axios
        .get(
          `http://localhost:8000/dashboard/accommodation/${userId}/${tripId}`
        )
        .then((res) => {
          setAccommodation(res.data.accommodation);
        });
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (accommodation.length) {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">Accommodation</h1>
          <AddAccommodation
            className="add-accomodation"
            handleOpen={handleOpen}
            open={open}
            handleClose={handleClose}
            accommodationData={accommodationArray}
            accommodationId={null}
            userId={userId}
          />
        </div>
        <div className="body">
          <AccommodationCard accommodation={accommodation} userId={userId} />
        </div>
        <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">Accommodation</h1>
          <AddAccommodation
            className="add-accomodation"
            handleOpen={handleOpen}
            open={open}
            handleClose={handleClose}
            accommodationData={accommodationArray}
            accommodationId={null}
            userId={userId}
          />
        </div>
      </div>
    );
  }
};
