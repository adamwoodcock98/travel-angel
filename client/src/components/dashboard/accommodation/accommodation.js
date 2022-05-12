import axios from "axios";
import React, { useState, useEffect } from "react";
import AccommodationCard from "./accommodationCard";
import AddAccommodation from "./addAccommodation";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Alerts } from "../../assets/snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import "../../assets/styling/cards.css"

export const ViewAccommodation = ({ session }) => {
  const { tripId } = useParams();
  const [state, setState] = useState(0);
  const userId = session;
  const [accommodation, setAccommodation] = useState([]);
  const [open, setOpen] = useState(false);
  const [accommodationArray, setAccommodationArray] = useState({
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
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [didUpdate, setDidUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleUpload = async () => {
    setState((prev) => prev + 1);
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
    setDidUpdate(!didUpdate);
  };

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/flights/download/${id}`);
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
  }, [didUpdate, state]);

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
    return (
      "https://www.google.com/maps/search/?api=1&query=" +
      formatAddressMaps(address)
    );
  };

  if (loading) {
    return(
      <div className="loading" style={{ display: loading ? "" : "none" }}>
        <CircularProgress color="secondary" />
        <p color="secondary">loading...</p>
      </div>
    )
  } else if (accommodation.length) {
    return (
      <>
        {/* <div className="container"> */}
          <div className="accommodation-header">
            <h1 className="very-big"> Accommodation</h1>
          </div>
          <div className="accommodation-body">
            <AccommodationCard
              accommodation={accommodation}
              userId={userId}
              handleDirections={handleDirections}
              refresh={handleClose}
              handleUpload={handleUpload}
            />
          </div>
          <div id="fab-card-position">
          <Fab
            size="large"
            color="secondary"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab></div>
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
          <Alerts
            message={alertMessage}
            open={alertOpen}
            handleClose={handleAlertClose}
            alertPosition={alertPosition}
            alertType={alertType}
          />
        {/* </div> */}
      </>
    );
  } else {
    return (
      <div className="empty-window">
        <div>
          <h1 className="very-big">Accommodation</h1>
        </div>
        <div className="empty-prompt" >
        <h3>Looks like you don't have any saved places</h3>
        <h2>Press  +  to get started</h2>
        </div>
        <div className="empty-button" id="fab-card-position">
          <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        </div>
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
        <Alerts
          message={alertMessage}
          open={alertOpen}
          handleClose={handleAlertClose}
          alertPosition={alertPosition}
          alertType={alertType}
        />
      </div>
    );
  }
};