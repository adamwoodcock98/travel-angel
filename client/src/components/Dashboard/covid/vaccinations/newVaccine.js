import React, { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from '@mui/material/ListSubheader';

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const AddVaccine = (props) => {
  const [open, setOpen] = useState(true);
  const [vaccine, setVaccine] = useState({
    dose: "",
    date: "",
    type: "",
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setVaccine({
      ...vaccine,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { dose, date, type } = vaccine;

    const newDose = { dose, date, type };

    axios
      .post("http://localhost:8000/dashboard/covid/vaccination", newDose)
      .then((res) => {
        handleClose();
        window.location = "/";
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Vaccine dose</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store the details of your vaccine dose
          </DialogContentText>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
            <Select defaultValue="" id="dose" label="Dose" autofocus>
              <ListSubheader>mRNA Vaccine</ListSubheader>
              <MenuItem value={1}>1st Dose</MenuItem>
              <MenuItem value={2}>2nd Dose</MenuItem>
              <MenuItem value={3}>Booster</MenuItem>
              <ListSubheader>Carrier Vaccine</ListSubheader>
              <MenuItem value={4}>Primary Dose</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={vaccine.date}
            autoFocus
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="datetime-local"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <FormControl sx={{ m: 1, minWidth: 190 }}>
            <InputLabel id="demo-select-small">Vaccine Type</InputLabel>
            <Select
              value={vaccine.type}
              autoFocus
              margin="dense"
              id="type"
              name="type"
              label="Vaccine Type"
              variant="outlined"
              onChange={handleChange}
              required
            >
              <MenuItem value={false}>Novavax (Nuvaxovid)</MenuItem>
              <MenuItem value={true}>Moderna (Spikevax)</MenuItem>
              <MenuItem value={false}>Pfizer/BioNTech (Comirnaty)</MenuItem>
              <MenuItem value={true}>Oxford/AstraZeneca (Vaxzevria)</MenuItem>
              <MenuItem value={false}>Covishield (AstraZeneca formulation)</MenuItem>
              <MenuItem value={true}>Sinopharm (Covilo)</MenuItem>
              <MenuItem value={false}>Sinovac (CoronaVac)</MenuItem>
              <MenuItem value={true}>Johnson & Johnson (Janssen)</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save Vaccine Details</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVaccine;
