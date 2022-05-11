import React, { useState, useEffect } from "react";
import axios from "axios";
import AddParking from "./addParking";
import ParkingCard from "./viewParking/viewParking";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";

const Parking = ({ session }) => {
  console.log("this is the parking rendering ");

  const { tripId } = useParams();
  const [state, setState] = useState(0);

  const handleUpload = async () => {
    setState((prev) => prev + 1);
  };

  const userId = session;

  const [open, setOpen] = useState(false);
  const [parking, setParking] = useState([]);
  const [emptyFields, setEmptyFields] = useState([]);
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
    trip: tripId,
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

  const onSubmit = (e) => {
    e.preventDefault();

    const {
      startDate,
      endDate,
      airport,
      type,
      regPlate,
      company,
      contactNumber,
      bookingReference,
      notes,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
      user,
      trip,
    } = newParking;

    const newBooking = {
      startDate,
      endDate,
      airport,
      type,
      regPlate,
      company,
      contactNumber,
      bookingReference,
      notes,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
      user,
      trip,
    };

    if(startDate === "" || endDate === "" || addressLine1 === "" || city === "" || postalCode === ""){
      setEmptyFields(['startDate', 'endDate', 'addressLine1', 'city', 'postalCode'])
      return
    }

    api.post(`/`, newBooking).then((res) => {
      handleClose();
      setParking({
        startDate: "",
        endDate: "",
        airport: "",
        type: "",
        regPlate: "",
        company: "",
        contactNumber: "",
        bookingReference: "",
        notes: "",
        buildingNumber: "",
        buildingName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        stateCounty: "",
        countryCode: "",
        user: userId,
        trip: tripId,
      });
    });
  };

  useEffect(() => {
    if (userId !== "null") {
      api.get(`/${userId}/${tripId}`).then((res) => {
        const bookings = res.data.bookings;
        setParking(bookings);
      });
    }
  }, [newParking, state]);

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

  if (parking.length) {
    const parkingArray = [];

    parking.forEach((booking) => {
      parkingArray.push(
        <ParkingCard
          bookingData={booking}
          key={booking._id}
          handleUpload={handleUpload}
          userId={userId}
          tripId={tripId}
          handleDirections={handleDirections}
        />
      );
    });

    return (
      <div className="parking-window">
        <div className="parking-header">
          <h1>Parking</h1>
        </div>
        <div className="parking-content">{parking.length && parkingArray}</div>
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
            emptyFields={emptyFields}
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
      <Fab 
        size="large" c
        olor="secondary" 
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
        emptyFields={emptyFields}
      />
      </>
    );
  }
};

export default Parking;
