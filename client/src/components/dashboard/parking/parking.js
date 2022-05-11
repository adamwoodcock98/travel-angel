import React, { useState, useEffect } from "react";
import axios from "axios";
import AddParking from "./addParking";
import ParkingCard from "./viewParking/viewParking";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { Alerts } from "../../assets/snackbar";
import CircularProgress from '@mui/material/CircularProgress';

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
    if (userId !== "null") {
      api.get(`/${userId}/${tripId}`)
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
        }
      })
      .finally(() => setLoading(false));;
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
      <div className="loading" style={{ display: loading ? "" : "none"}} >
        <CircularProgress color="secondary" />
        <p color="secondary">loading...</p>
      </div>
    )
  } else if (parking.length) {
    const parkingArray = [];

    parking.forEach((booking) => {
      parkingArray.push(
        <ParkingCard bookingData={booking} key={booking._id} userId={userId} tripId={tripId} handleDirections={handleDirections} refresh={handleClose} handleUpload={handleUpload} />
      );
    });

    return (
      <>
        <div className="parking-window">
          <div className="parking-header">
            <h1>Parking</h1>
          </div>
          <div className="parking-content">{parking.length && parkingArray}</div>
          <div className="parking-footer">
            <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
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
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
      <h1>Looks like you don't have any saved parking voucher, add your first one now!</h1>
      <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
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
      </>
    );
  }
};

export default Parking;
