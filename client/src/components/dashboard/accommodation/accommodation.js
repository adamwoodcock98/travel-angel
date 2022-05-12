import axios from "axios";
import React, { useState, useEffect } from "react";
import AccommodationCard from "./accommodationCard";
import AddAccommodation from "./addAccommodation";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Alerts } from "../../assets/snackbar";
import CircularProgress from "@mui/material/CircularProgress";

export const ViewAccommodation = ({ session }) => {
  const { tripId } = useParams();

  const [state, setState] = useState(0);

  console.log("This is the state, is this causing problems?", state);

  const handleUpload = async () => {
    setState((prev) => prev + 1);
  };

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

  console.log(
    "This is the accommodation, is this changing?",
    accommodationArray
  );

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [didUpdate, setDidUpdate] = useState(false);
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
    setDidUpdate(!didUpdate);
  };

  useEffect(() => {
    setLoading(true);
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

  if (accommodation.length) {
    return (
      <>
        <div className="loading" style={{ display: loading ? "" : "none" }}>
          <CircularProgress color="secondary" />
        </div>
        <div className="container">
          <div className="accommodation-header">
            <h1 className="title"> Your accommodation</h1>
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
          <div className="accommodation-body">
            <AccommodationCard
              accommodation={accommodation}
              userId={userId}
              handleDirections={handleDirections}
              refresh={handleClose}
            />
          </div>
          <Fab
            size="large"
            color="secondary"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
          <Alerts
            message={alertMessage}
            open={alertOpen}
            handleClose={handleAlertClose}
            alertPosition={alertPosition}
            alertType={alertType}
          />
        </div>
      </>
    );
  } else {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">Accommodation</h1>
          <h1>
            Looks like you don't have any saved flights, add your first one now!
          </h1>
          <Fab
            size="large"
            color="secondary"
            aria-label="add"
            onClick={handleOpen}
          >
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
