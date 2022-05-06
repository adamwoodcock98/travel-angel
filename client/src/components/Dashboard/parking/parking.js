import React, { useState, useEffect } from "react";
import axios from "axios";
import AddParking from "./addParking"
import ParkingCard from "./viewParking"

const Parking = () => {
  const [open, setOpen] = useState(false);
  const [parking, setParking] = useState([]);
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
    buildingNumber: "",
    buildingName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    stateCounty: "",
    countryCode: "",
  });

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/parking/",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setNewParking({
      ...newParking,
      [e.target.name]: value,
    });
  };

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
    };

    api.post("/", newBooking).then((res) => {
        handleClose();
        setNewParking({
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
      })
    });
  };

  useEffect(() => {
    api.get("/").then(res => {  
      const bookings = res.data.bookings
      setParking(bookings);
    });
  }, [newParking])

  if (parking.length) {

    const parkingArray = [];

    parking.forEach(booking => {
      parkingArray.push(<ParkingCard bookingData={booking} key={booking._id} />)
    })

    return (
      <div className="parking-window">
        <div className="parking-header">
          <h1>Parking</h1>
        </div>
        <div className="parking-content">
          {parking.length && parkingArray}
        </div>
        <div className="parking-footer">
          <AddParking
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleChange={handleChange}
            parking={parking}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    )
  } else {
    return(
      <AddParking
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        parking={parking}
        onSubmit={onSubmit}
      />
    )
  }
};

export default Parking;