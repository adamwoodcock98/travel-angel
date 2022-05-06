import { useState } from 'react';
import AddTransfer from './addTransfer'
import axios from 'axios'

const Transfers = () => {
  const [open, setOpen] = useState(false);
  const [transfer, setTransfer] = useState({
    pickupTime: "",
    dropoffTime: "",
    pickupAddress: {
      buildingNumber: "",
      buildingName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      stateCounty: "",
      countryCode: "",
    },
    dropoffAddress: {
      buildingNumber: "",
      buildingName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      stateCounty: "",
      countryCode: "",
    },
    isOutbound: "",
    company: "",
    contactNumber: "",
    bookingReference: "",
  });

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setTransfer((prevState) => ({
      ...prevState,
      pickupAddress: {
        ...prevState.pickupAddress,
        [e.target.name]: value
      },
    }));
  }

  const handleDropoffChange = (e) => {
    const value = e.target.value;
    setTransfer((prevState) => ({
      ...prevState,
      dropoffAddress: {
        ...prevState.dropoffAddress,
        [e.target.name]: value
      },
    }));
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setTransfer({
      ...transfer,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { 
      pickupTime,
      dropoffTime,
      pickupAddress,
      dropoffAddress,
      isOutbound,
      company,
      contactNumber,
      bookingReference} = transfer;

    const newTransfer = { 
      pickupTime,
      dropoffTime,
      pickupAddress,
      dropoffAddress,
      isOutbound,
      company,
      contactNumber,
      bookingReference };

    await axios.post("http://localhost:8000/dashboard/transfers/", newTransfer).then(() => {
      handleClose();
      window.location = "/";
    });
  };

  return (
    <div className="Transfers">
      <AddTransfer
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        transfer={transfer}
        handleSubmit={handleSubmit}
        handlePickupChange={handlePickupChange}
        handleDropoffChange={handleDropoffChange}
      />
    </div>
  );
};

export default Transfers;