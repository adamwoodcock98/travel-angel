import React, { useState, useEffect } from "react";
import axios from "axios";
import AddParking from "./addParking";
import ParkingCard from "./viewParking/viewParking";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { Alerts } from "../../assets/snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const Parking = ({ session }) => {
  const { tripId } = useParams();
  const [state, setState] = useState(0);

  const handleUpload = async () => {
    setState((prev) => prev + 1);
  };

  const userId = session;

  const [open, setOpen] = useState(false);
  const [parking, setParking] = useState([]);
  const [didUpdate, setDidUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [newParking, setNewParking] = useState({
    startDate: "",
    endDate: "",
    airport: "",
    type: "",
    regPlate: "",
    company: "",
    contactNumber: "",
    bookingReference: "",
    notes: "",
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
    baseURL: "http://localhost:8000/dashboard/parking/",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDidUpdate(!didUpdate);
  };

  useEffect(() => {
    setLoading(true);
    setLoadingFailed(false);
    if (userId !== "null") {
      api
        .get(`/${userId}/${tripId}`)
        .then((res) => {
          const bookings = res.data.bookings;
          setParking(bookings);
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
            setLoadingFailed(true);
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

 
  if (loadingFailed) {
    return(
      <div className="empty-window">
        <h1>Parking</h1>
        <div className="empty-prompt">
          <h3>This connection doesn't seem quite right</h3>
          <h2>:(</h2>
          <br />
          <Button onClick={handleClose} variant="outlined" color="primary">try again</Button>
        </div>
      </div>
    )
  } else  if (loading) {
    return (
      <div className="loading" style={{ display: loading ? "" : "none" }}>
        <CircularProgress color="secondary" />
        <p color="secondary">loading...</p>
      </div>
    );
  } else if (parking.length) {
    const parkingArray = [];

    parking.forEach((booking) => {
      parkingArray.push(
        <ParkingCard
          bookingData={booking}
          key={booking._id}
          userId={userId}
          tripId={tripId}
          handleDirections={handleDirections}
          refresh={handleClose}
          handleUpload={handleUpload}
        />
      );
    });

    return (
      <>
        <div className="parking-window">
          <div className="parking-header">
            <h1 className="very-big">Parking</h1>
          </div>
          <div className="parking-content">
            {parking.length && parkingArray}
          </div>
          <div className="parking-footer">
            <Fab
              size="large"
              color="secondary"
              aria-label="add"
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
            <AddParking
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              parkingData={newParking}
              parkingId={null}
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
        </div>
      </>
    )
  } else {
    return (
      <div className="empty-window">
        <h1 className="very-big">Parking</h1>
        <div className="empty-prompt">
          <h3>Looks like you don't have any saved parking</h3>
          <h2>Press + to get started</h2>
        </div>
        <div className="empty-button" id="fab-card-position">
          <Fab
            size="large"
            color="secondary"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </div>
        <AddParking
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          parkingData={newParking}
          parkingId={null}
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

export default Parking;
