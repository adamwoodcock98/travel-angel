import React, { useState, useEffect } from "react";
import axios from "axios";
import AddParking from "./addParking"

const Parking = () => {
  const [open, setOpen] = useState(false);
  const [parking, setParking] = useState({
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
    setParking({
      ...parking,
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
    } = parking;

    const newParking = {
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

    api.post("/", newParking).then((res) => {
      handleClose();
      window.location = "/";
    });
  };

  return (
    <AddParking
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleChange={handleChange}
      parking={parking}
      onSubmit={onSubmit}
    />
  )
};

export default Parking;
