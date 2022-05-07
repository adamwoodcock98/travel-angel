import { useState } from 'react';
import AddVisa from './addVisa'
import axios from 'axios'

const Visas = () => {
  const [open, setOpen] = useState(false);
  const [visa, setVisa] = useState({
    visaNumber: "",
    startDate: "",
    endDate: "",
    issuingCountry: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setVisa({
      ...visa,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { 
      visaNumber,
      startDate,
      endDate,
      issuingCountry} = visa;

    const newVisa = { 
      visaNumber,
      startDate,
      endDate,
      issuingCountry}
    
    axios.post("http://localhost:8000/dashboard/visas/", newVisa).then(() => {
      handleClose();
    });
  };

  return(
    <div>
      <AddVisa
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleChange={handleChange}
      visa={visa}
      handleSubmit={handleSubmit}
    />
      </div>
  )

}

export default Visas;