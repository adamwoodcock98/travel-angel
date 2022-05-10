import axios from "axios";
import React, { useState, useEffect } from "react";
import AccommodationCard from "./accommodationCard";
import AddAccommodation from "./addAccommodation";
import { useParams } from "react-router-dom";
import "./accommodation.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Alerts } from "../../assets/snackbar";

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

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loading, setLoading] = useState(false);
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
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userId !== "null") {
      axios
        .get(
          `http://localhost:8000/dashboard/accommodation/${userId}/${tripId}`
        )
        .then((res) => {
          setAccommodation(res.data.accommodation);
        })
        .catch((error) => {
          if (error.response.status) {
            handleAlert(
              error.response.status + " - " + error.response.statusText,
              "error"
            );
          } else {
            handleAlert(
              "There was a problem connecting to the server.",
              "error"
            );
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const formatAddressMaps = (address) => {
    const addressObject = address;
    delete addressObject._id;
    delete addressObject.__v;
    const arrayOfAddressValues = Object.values(addressObject);
    const onlyDefinedAddressValues = arrayOfAddressValues.filter(
      (addressValue) => addressValue !== ""
    );
    return onlyDefinedAddressValues.join("+");
  };

  const handleDirections = (address) => {
    return "https://www.google.com/maps/search/?api=1&query="+formatAddressMaps(address)
   }

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
            tripId={tripId}
          />
        </div>
        <div className="body">
          <AccommodationCard accommodation={accommodation} userId={userId} handleDirections={handleDirections} />
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
          <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
          <AddAccommodation
            className="add-accomodation"
            handleOpen={handleOpen}
            open={open}
            handleClose={handleClose}
            accommodationData={accommodationArray}
            accommodationId={null}
            userId={userId}
            tripId={tripId}
          />
        </div>
      </div>
    );
  }
};
