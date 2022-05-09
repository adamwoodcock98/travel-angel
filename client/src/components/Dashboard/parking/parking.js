import React, { useState, useEffect } from "react";
import axios from "axios";
import AddParking from "./addParking";
import ParkingCard from "./viewParking";

const Parking = ({ session }) => {
  const userId = session;

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
    user: userId,
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
      user,
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
    };

    api.post(`/`, newBooking).then((res) => {
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
        user: userId,
      });
    });
  };

  useEffect(() => {
    if (userId !== "null") {
      api.get(`/${userId}`).then((res) => {
        const bookings = res.data.bookings;
        setParking(bookings);
      });
    }
  }, [newParking]);

  // LOADING SUBMIT BUTTON
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading])

  const handleLoadingClick = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    };

    await axios
      .post("http://localhost:8000/dashboard/parking/", newBooking)
      .catch((err) => console.log(err.message))
      .then(() => {
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
          user: userId,
        });
      });
    };

  if (parking.length) {
    const parkingArray = [];

    parking.forEach((booking) => {
      parkingArray.push(
        <ParkingCard bookingData={booking} key={booking._id} />
      );
    });

    return (
      <div className="parking-window">
        <div className="parking-header">
          <h1>Parking</h1>
        </div>
        <div className="parking-content">{parking.length && parkingArray}</div>
        <div className="parking-footer">
          <AddParking
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleChange={handleChange}
            parking={parking}
            onSubmit={onSubmit}
            handleLoadingClick={handleLoadingClick}
            loading={loading}
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
        handleChange={handleChange}
        parking={parking}
        onSubmit={onSubmit}
        handleLoadingClick={handleLoadingClick}
        loading={loading}
      />
    );
  }
};

export default Parking;
