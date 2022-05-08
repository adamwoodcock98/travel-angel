import axios from "axios";
import React, { useState, useEffect } from "react";
import AccommodationCard from "./accommodationCard";
import AddAccommodation from "./addAccommodation";
import "./accommodation.css";

export const ViewAccommodation = ({ session }) => {
  const userId = session;
  const [accommodation, setAccommodation] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userId !== "null") {
      axios
        .get(`http://localhost:8000/dashboard/accommodation/${userId}`)
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
            accommodationData={accommodation}
            accommodationId={null}
            userId={userId}
          />
        </div>
        <div className="body">
          <AccommodationCard accommodation={accommodation} userId={userId} />
        </div>
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
            accommodationData={accommodation}
            accommodationId={null}
            userId={userId}
          />
        </div>
      </div>
    );
  }
};
