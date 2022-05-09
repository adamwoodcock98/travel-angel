import React, { useState, useEffect } from "react";
import axios from "axios";
import AddParking from "./addParking/addParking";
import ParkingCard from "./viewParking/viewParking";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';

const Parking = ({ session }) => {
  const userId = session;

  const [open, setOpen] = useState(false);
  const [parking, setParking] = useState([]);
  const newParking = {
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
  };

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/parking/",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userId !== "null") {
      api.get(`/${userId}`).then((res) => {
        const bookings = res.data.bookings;
        setParking(bookings);
      });
    }
  }, []);

  if (parking.length) {
    const parkingArray = [];

    parking.forEach((booking) => {
      parkingArray.push(
        <ParkingCard bookingData={booking} key={booking._id} userId={userId} />
      );
    });

    return (
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
          />
        </div>
      </div>
    );
  } else {
    return (
      <AddParking
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        parkingData={newParking}
        parkingId={null}
        userId={userId}
      />
    );
  }
};

export default Parking;
