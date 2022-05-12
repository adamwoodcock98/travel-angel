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
import ListSubheader from "@mui/material/ListSubheader";
import "../../dashboard.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const AddVaccine = (props) => {
  const open = props.open;
  const handleClose = props.handleClose;
  const vaccinationsID = props.vaccinationsID;
  const doseData = props.doseData;
  const doseId = props.doseId;
  const handleUpload = props.handleUpload;

  const [vaccine, setVaccine] = useState({
    dose: doseData.dose,
    date: doseData.date,
    type: doseData.type,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setVaccine({
      ...vaccine,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let url;
    if (doseData._id) {
      url = `http://localhost:8000/dashboard/covid/vaccination/${vaccinationsID}/edit/${doseId}`;
    } else {
      url = `http://localhost:8000/dashboard/covid/vaccination/${vaccinationsID}/new`;
    }

    const { dose, date, type } = vaccine;

    const newDose = { dose, date, type };

    axios.post(url, newDose).then((res) => {
      handleClose();
      handleUpload();
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
            <Select
              defaultValue=""
              name="dose"
              id="dose"
              label="Dose"
              autoFocus
              onChange={handleChange}
            >
              <ListSubheader>mRNA Vaccine</ListSubheader>
              <MenuItem value={"1st Dose"}>1st Dose</MenuItem>
              <MenuItem value={"2nd Dose"}>2nd Dose</MenuItem>
              <MenuItem value={"Booster"}>Booster</MenuItem>
              <ListSubheader>Carrier Vaccine</ListSubheader>
              <MenuItem value={"Primary Dose"}>Primary Dose</MenuItem>
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
              margin="dense"
              id="type"
              name="type"
              label="Vaccine Type"
              variant="outlined"
              onChange={handleChange}
              required
            >
              <MenuItem value={"Novavax (Nuvaxovid)"}>
                Novavax (Nuvaxovid)
              </MenuItem>
              <MenuItem value={"Moderna (Spikevax)"}>
                Moderna (Spikevax)
              </MenuItem>
              <MenuItem value={"Pfizer/BioNTech (Comirnaty)"}>
                Pfizer/BioNTech (Comirnaty)
              </MenuItem>
              <MenuItem value={"Oxford/AstraZeneca (Vaxzevria)"}>
                Oxford/AstraZeneca (Vaxzevria)
              </MenuItem>
              <MenuItem value={"Covishield (AstraZeneca formulation)"}>
                Covishield (AstraZeneca formulation)
              </MenuItem>
              <MenuItem value={"Sinopharm (Covilo)"}>
                Sinopharm (Covilo)
              </MenuItem>
              <MenuItem value={"Sinovac (CoronaVac)"}>
                Sinovac (CoronaVac)
              </MenuItem>
              <MenuItem value={"Johnson & Johnson (Janssen)"}>
                Johnson & Johnson (Janssen)
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button id="default-cancel-button" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="save-details-button" onClick={onSubmit}>
            Save Vaccine Details
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVaccine;
