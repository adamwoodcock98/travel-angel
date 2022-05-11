import axios from "axios";
import React, { useState, useEffect } from "react";
import AccommodationCard from "./accommodationCard";
import AddAccommodation from "./addAccommodation";
import { useParams } from "react-router-dom";
import "./accommodation.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
  const [emptyFields, setEmptyFields] = useState([])
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userId !== "null") {
      axios
        .get(
          `http://localhost:8000/dashboard/accommodation/${userId}/${tripId}`
        )
        .then((res) => {
          setAccommodation(res.data.accommodation);
        })
        .catch((err) => console.log(err.message));
    }
  }, [accommodationArray, state]);

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
      user,
      trip,
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
      user,
      trip,
    };

    if (name === "" || contactNumber === "" || checkInDate === "" || checkOutDate === "" || checkInTime === "" || checkOutTime === "" || bookingReference === "") {
      setEmptyFields(['name', 'contactNumber', 'checkInDateInput', 'checkOutDateInput', 'checkInTimeInput', 'checkOutTimeInput', 'bookingReference'])
      return
    }

    await axios
      .post("http://localhost:8000/dashboard/accommodation", newAccommodation)
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
          user: userId,
          trip: tripId,
        });
        handleClose();
      });
  };

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

  return(
    <div className="container">
      <div className="header">
        <h1 className="title">Accommodation</h1>
        <AddAccommodation
          className="add-accomodation"
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          accommodation={accommodationArray}
          handleSubmit={handleSubmit}
          emptyFields={emptyFields}
        />
      </div>
      {accommodation.length &&
        <div className="body">
          <AccommodationCard
            accommodation={accommodation}
            handleUpload={handleUpload}
            userId={userId}
            handleDirections={handleDirections}
          />
        </div>}
          <Fab
            size="large"
            color="secondary"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
    </div>
    )
  } else {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">Accommodation</h1>
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
      </div>
    );
  }
};
