import axios from "axios";
import React, { useState, useEffect } from "react";
import AccommodationCard from "./accommodationCard";
import AddAccommodation from "./addAccommodation";

export const ViewAccommodation = () => {
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
    buildingNumber: "",
    buildingName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    stateCounty: "",
    countryCode: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard/accommodation").then((res) => {
      setAccommodation(res.data);
    });
  }, [accommodationArray]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAccommodationArray({
      ...accommodationArray,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      contactNumber,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      bookingReference,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
    } = accommodationArray;

    const newAccommodation = {
      name,
      contactNumber,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      bookingReference,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
    };

    console.log(newAccommodation);

    await axios
      .post("http://localhost:5000/dashboard/accommodation", newAccommodation)
      .catch((err) => console.log(err.message))
      .then(() => {
        setAccommodationArray({
          name: "",
          contactNumber: "",
          checkInDate: "",
          checkOutDate: "",
          checkInTime: "",
          checkOutTime: "",
          bookingReference: "",
          buildingNumber: "",
          buildingName: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          postalCode: "",
          stateCounty: "",
          countryCode: "",
        });
        handleClose();
      });
  };

  if (accommodation.length) {
    return (
      <div>
        <AccommodationCard accommodation={accommodation} />
        <AddAccommodation
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          accommodation={accommodationArray}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  } else {
    return <p>Loading..</p>;
  }
};
