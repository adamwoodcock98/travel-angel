import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function AddFlight({
  open,
  handleOpen,
  handleClose,
  handleChange,
  flight,
  onSubmit,
}) {
  return (
    <div>
      <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Flight</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store your flight details
          </DialogContentText>
          <TextField
            value={flight.flightNumber}
            autoFocus
            margin="dense"
            id="flightNumber"
            name="flightNumber"
            label="Flight Number"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.flightTime}
            autoFocus
            margin="dense"
            id="flightTime"
            name="flightTime"
            label="Time"
            type="time"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={flight.flightDate}
            autoFocus
            margin="dense"
            id="flightDate"
            name="flightDate"
            label="Date"
            type="date"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={flight.airline}
            autoFocus
            margin="dense"
            id="airline"
            name="airline"
            label="Airline"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.departureAirport}
            autoFocus
            margin="dense"
            id="departureAirport"
            name="departureAirport"
            label="Departure Airport"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={flight.departureTerminal}
            autoFocus
            margin="dense"
            id="departureTerminal"
            name="departureTerminal"
            label="Departure Terminal"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.departureCity}
            autoFocus
            margin="dense"
            id="departureCity"
            name="departureCity"
            label="Departure City"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={flight.departureGate}
            autoFocus
            margin="dense"
            id="departureGate"
            name="departureGate"
            label="Departure Gate"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.arrivalAirport}
            autoFocus
            margin="dense"
            id="arrivalAirport"
            name="arrivalAirport"
            label="Arrival Airport"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={flight.arrivalTerminal}
            autoFocus
            margin="dense"
            id="arrivalTerminal"
            name="arrivalTerminal"
            label="Arrival Terminal"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.arrivalCity}
            autoFocus
            margin="dense"
            id="arrivalCity"
            name="arrivalCity"
            label="Arrival City"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={flight.arrivalGate}
            autoFocus
            margin="dense"
            id="arrivalGate"
            name="arrivalGate"
            label="Arrial Gate"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={flight.bookingReference}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <FormControl sx={{ m: 1, minWidth: 190 }}>
            <InputLabel id="demo-select-small">Journey Type</InputLabel>
            <Select
              value={flight.isOutbound}
              autoFocus
              margin="dense"
              id="isOutbound"
              name="isOutbound"
              label="Journey type"
              variant="outlined"
              onChange={handleChange}
              required
            >
              <MenuItem value={false}>Inbound</MenuItem>
              <MenuItem value={true}>Outbound</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save Flight Details</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
