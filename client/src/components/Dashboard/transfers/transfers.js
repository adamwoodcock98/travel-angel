import { useState } from 'react';
import AddTransfer from './addTransfer'

const Transfers = () => {
  const [open, setOpen] = useState(false);
  const [transfer, setTransfer] = useState({
    pickupTime: "",
    dropoffTime: "",
    pickupAddress: "",
    dropoffAddress: "",
    isOutbound: "",
    company: "",
    contactNumber: "",
    bookingReference: "",
  });

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

  return (
    <div className="Transfers">
      <AddTransfer
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        transfer={transfer}
      />
    </div>
  );
};

export default Transfers;