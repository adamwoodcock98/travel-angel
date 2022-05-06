import AddPassport from './addPassport.js';
import { DisplayPassport } from './displayPassport';
import React, { useState } from 'react';
import axios from "axios";

const Passport = () => {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="Passport">
      <DisplayPassport />

      <AddPassport
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        passport={passport}
        onSubmit={onSubmit}
      />
    </div>
  );
};
    
export default Passport;