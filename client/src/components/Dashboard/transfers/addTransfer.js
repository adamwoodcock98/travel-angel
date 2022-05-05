import Button from "@mui/material/Button";
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

export default function AddTransfer({
  open,
  handleOpen,
  handleClose,
  handleChange,
  transfer,
  onSubmit,
}) {
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add Transfer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store your transfer details
          </DialogContentText>
          <TextField
            value={transfer.pickupTime}
            autoFocus
            margin="dense"
            id="pickupTime"
            name="pickupTime"
            label="Pickup Time"
            type="time"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={transfer.dropoffTime}
            autoFocus
            margin="dense"
            id="dropoffTime"
            name="dropoffTime"
            label="Dropoff Time"
            type="time"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={transfer.pickupAddress}
            autoFocus
            margin="dense"
            id="pickupAddress"
            name="pickupAddress"
            label="Pickup Address"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={transfer.dropoffAddress}
            autoFocus
            margin="dense"
            id="dropoffAddress"
            name="dropoffAddress"
            label="Dropoff Address"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <FormControl sx={{ m: 1, minWidth: 190 }}>
            <InputLabel id="demo-select-small">Journey Type</InputLabel>
            <Select
              value={transfer.isOutbound}
              autoFocus
              margin="dense"
              id="isOutbound"
              name="isOutbound"
              label="Journey type"
              variant="outlined"
              onChange={handleChange}
            >
              <MenuItem value={false}>Inbound</MenuItem>
              <MenuItem value={true}>Outbound</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={transfer.company}
            autoFocus
            margin="dense"
            id="company"
            name="company"
            label="Company"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={transfer.contactNumber}
            autoFocus
            margin="dense"
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={transfer.bookingReference}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save Transfer Details</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
