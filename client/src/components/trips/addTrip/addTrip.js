import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const AddTrip = ({
  open,
  handleOpen,
  handleClose,
  handleChange,
  trip,
  handleSubmit,
}) => {
  return (
    <div>
      <div id="fab-position">
      <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab></div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary">Add Trip</DialogTitle>
        <DialogContent>
          <DialogContentText>Add an upcoming trip!</DialogContentText>
          <TextField
            value={trip.name}
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Trip Name"
            type="text"
            fullWidth
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={trip.startDate}
            autoFocus
            margin="dense"
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            variant="outlined"
            required
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={trip.endDate}
            autoFocus
            margin="dense"
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            required
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Trip</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTrip;
