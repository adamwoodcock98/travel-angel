import axios from "axios";
import React, { useState } from "react";
import { Address } from "./address/address.js";

export const Dashboard = () => {
  const [address, setAddress] = useState({
    buildingNumber: "",
    buildingName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    stateCounty: "",
    countryCode: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setAddress({
      ...address,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
    } = address;

    const newAddress = {
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
    };

    await axios
      .post("http://localhost:5000/dashboard/address", newAddress)
      .then(() => console.log(newAddress));
  };

  return (
    <Address
      address={address}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
