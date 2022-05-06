import AddPassport from './addPassport.js';
import { DisplayPassport } from './displayPassport';
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Passport = () => {
  const [open, setOpen] = useState(false);
  const [displayState, setDisplayState] = useState([]);
  const [passport, setPassport] = useState({
    passportNumber: "",
    firstName: "",
    lastName: "",
    nationality: "",
    country: "",
    dob: "",
    gender: "",
    placeOfBirth: "",
    dateOfIssue: "",
    dateOfExpiry: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setPassport({
      ...passport,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const {  
    passportNumber,
    firstName, 
    lastName,
    nationality,
    country,
    dob,
    gender,
    placeOfBirth,
    dateOfIssue,
    dateOfExpiry } = passport;

    const newPassport = {  
      passportNumber,
      firstName, 
      lastName,
      nationality,
      country,
      dob,
      gender,
      placeOfBirth,
      dateOfIssue,
      dateOfExpiry };

    await axios.post("http://localhost:8000/dashboard/passport/", newPassport).then(() => {
      handleClose();
      window.location = "/";
    });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/dashboard/passport")
    .then((res) => {
      setDisplayState(res.data.passport)
    })
  }, [])

  const passports = [];
  displayState.forEach((pass) => {
    passports.push(<DisplayPassport passport={pass} />)
  })

  if (displayState.length) {
    return (
      <div id="Passport">
        {passports}
          {/* <DisplayPassport
          passport={displayState[0]}
          /> */}
          <AddPassport
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleChange={handleChange}
          passport={passport}
          onSubmit={onSubmit}
        />
      </div>
    )} else {
      return (
        // <i>You don't have your passport saved just yet. Add it now!</i>
          <AddPassport
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleChange={handleChange}
          passport={passport}
          onSubmit={onSubmit}
        />
      )};
};
    
export default Passport;