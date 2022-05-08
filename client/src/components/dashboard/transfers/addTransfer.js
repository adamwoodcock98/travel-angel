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
import React from "react";

export default function AddTransfer({
  open,
  handleOpen,
  handleClose,
  handleChange,
  transfer,
  handleSubmit,
  handlePickupChange,
  handleDropoffChange,
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
          <FormControl sx={{ m: 1, ml: 0, minWidth: 200 }}>
            <InputLabel>Journey Type</InputLabel>
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
            required
            onChange={handleChange}
          />
          <TextField
            value={transfer.pickupTime}
            autoFocus
            margin="dense"
            id="pickupTime"
            name="pickupTime"
            label="Pickup Date and Time"
            type="datetime-local"
            variant="outlined"
            required
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
            label="Dropoff Date and Time"
            type="datetime-local"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <DialogContentText>Pickup Address</DialogContentText>
          <TextField
            value={transfer.pickupAddress.buildingNumber}
            autoFocus
            margin="dense"
            id="buildingNumber"
            name="buildingNumber"
            label="Building Number"
            type="text"
            variant="outlined"
            onChange={handlePickupChange}
          />
          <TextField
            value={transfer.pickupAddress.buildingName}
            autoFocus
            margin="dense"
            id="buildingName"
            name="buildingName"
            label="Building Name"
            type="text"
            variant="outlined"
            onChange={handlePickupChange}
          />
          <TextField
            value={transfer.pickupAddress.addressLine1}
            autoFocus
            margin="dense"
            id="addressLine1"
            name="addressLine1"
            label="Address Line 1"
            type="text"
            variant="outlined"
            required
            onChange={handlePickupChange}
          />
          <TextField
            value={transfer.pickupAddress.addressLine2}
            autoFocus
            margin="dense"
            id="addressLine2"
            name="addressLine2"
            label="Address Line 2"
            type="text"
            variant="outlined"
            onChange={handlePickupChange}
          />
          <TextField
            value={transfer.pickupAddress.city}
            autoFocus
            margin="dense"
            id="city"
            name="city"
            label="City"
            type="text"
            variant="outlined"
            required
            onChange={handlePickupChange}
          />
          <TextField
            value={transfer.pickupAddress.stateCounty}
            autoFocus
            margin="dense"
            id="stateCounty"
            name="stateCounty"
            label="State/Province"
            type="text"
            variant="outlined"
            onChange={handlePickupChange}
          />
          <TextField
            value={transfer.pickupAddress.postalCode}
            autoFocus
            margin="dense"
            id="postalCode"
            name="postalCode"
            label="Postal/Zip Code"
            type="text"
            variant="outlined"
            required
            onChange={handlePickupChange}
          />
          <TextField
            value={transfer.pickupAddress.countryCode}
            autoFocus
            margin="dense"
            id="countryCode"
            name="countryCode"
            label="Country"
            type="text"
            variant="outlined"
            onChange={handlePickupChange}
          />
          <DialogContentText>Dropoff Address</DialogContentText>
          <TextField
            value={transfer.dropoffAddress.buildingNumber}
            autoFocus
            margin="dense"
            id="buildingNumber"
            name="buildingNumber"
            label="Building Number"
            type="text"
            variant="outlined"
            onChange={handleDropoffChange}
          />
          <TextField
            value={transfer.dropoffAddress.buildingName}
            autoFocus
            margin="dense"
            id="buildingName"
            name="buildingName"
            label="Building Name"
            type="text"
            variant="outlined"
            onChange={handleDropoffChange}
          />
          <TextField
            value={transfer.dropoffAddress.addressLine1}
            autoFocus
            margin="dense"
            id="addressLine1"
            name="addressLine1"
            label="Address Line 1"
            type="text"
            variant="outlined"
            required
            onChange={handleDropoffChange}
          />
          <TextField
            value={transfer.dropoffAddress.addressLine2}
            autoFocus
            margin="dense"
            id="addressLine2"
            name="addressLine2"
            label="Address Line 2"
            type="text"
            variant="outlined"
            onChange={handleDropoffChange}
          />
          <TextField
            value={transfer.dropoffAddress.city}
            autoFocus
            margin="dense"
            id="city"
            name="city"
            label="City"
            type="text"
            variant="outlined"
            required
            onChange={handleDropoffChange}
          />
          <TextField
            value={transfer.dropoffAddress.stateCounty}
            autoFocus
            margin="dense"
            id="stateCounty"
            name="stateCounty"
            label="State/Province"
            type="text"
            variant="outlined"
            onChange={handleDropoffChange}
          />
          <TextField
            value={transfer.dropoffAddress.postalCode}
            autoFocus
            margin="dense"
            id="postalCode"
            name="postalCode"
            label="Postal/Zip Code"
            type="text"
            variant="outlined"
            required
            onChange={handleDropoffChange}
          />
          <TextField
            value={transfer.dropoffAddress.countryCode}
            autoFocus
            margin="dense"
            id="countryCode"
            name="countryCode"
            label="Country"
            type="text"
            variant="outlined"
            onChange={handleDropoffChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Transfer Details</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
