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

export default function AddAccommodation({
  handleOpen,
  open,
  handleClose,
  handleChange,
  accommodation,
  handleSubmit,
  emptyFields,
}) {
  return (
    <div>
      <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Accommodation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Accommodation. Fill in the fields to store your Accommodation
            details
          </DialogContentText>
          <TextField
            value={accommodation.name}
            inputProps={{ "data-testid": "name" }}
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Accommodation Name"
            type="text"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('name') ? '1px solid red' : '' , borderRadius: "5px" }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.contactNumber}
            inputProps={{ "data-testid": "contactNumber" }}
            autoFocus
            margin="dense"
            id="contactNumber"
            name="contactNumber"
            label="Accommodation Contact Number"
            type="number"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('contactNumber') ? '1px solid red' : '' , borderRadius: "5px" }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkInDate}
            data-testid="checkInDate"
            inputProps={{ "data-testid": "checkInDateInput" }}
            autoFocus
            margin="dense"
            id="checkInDate"
            name="checkInDate"
            label="Date of Arrival"
            type="date"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('checkInDateInput') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkOutDate}
            inputProps={{ "data-testid": "checkOutDateInput" }}
            data-testid="checkOutDate"
            autoFocus
            margin="dense"
            id="checkOutDate"
            name="checkOutDate"
            label="Date of Departure"
            type="date"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('checkOutDateInput') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkInTime}
            inputProps={{ "data-testid": "checkInTimeInput" }}
            data-testid="checkInTime"
            autoFocus
            margin="dense"
            id="checkInTime"
            name="checkInTime"
            label="Time of Arrival"
            type="time"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('checkInTimeInput') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.checkOutTime}
            inputProps={{ "data-testid": "checkOutTimeInput" }}
            data-testid="checkOutTime"
            autoFocus
            margin="dense"
            id="checkOutTime"
            name="checkOutTime"
            label="Time of Departure"
            type="time"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('checkOutTimeInput') ? '1px solid red' : '' , borderRadius: "5px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.bookingReference}
            inputProps={{ "data-testid": "bookingReference" }}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            required
            sx={{border: emptyFields.includes('bookingReference') ? '1px solid red' : '' , borderRadius: "5px" }}
            onChange={handleChange}
          />
          <TextField
            value={accommodation.buildingNumber}
            inputProps={{ "data-testid": "buildingNumber" }}
            autoFocus
            margin="dense"
            id="buildingNumber"
            name="buildingNumber"
            label="Building Number"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={accommodation.buildingName}
            inputProps={{ "data-testid": "buildingName" }}
            autoFocus
            margin="dense"
            id="buildingName"
            name="buildingName"
            label="Building Name"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={accommodation.addressLine1}
            inputProps={{ "data-testid": "addressLine1" }}
            autoFocus
            margin="dense"
            id="addressLine1"
            name="addressLine1"
            label="Address Line 1"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.addressLine2}
            inputProps={{ "data-testid": "addressLine2" }}
            autoFocus
            margin="dense"
            id="addressLine2"
            name="addressLine2"
            label="Address Line 2"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={accommodation.city}
            inputProps={{ "data-testid": "city" }}
            autoFocus
            margin="dense"
            id="city"
            name="city"
            label="City"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.stateCounty}
            inputProps={{ "data-testid": "stateCounty" }}
            autoFocus
            margin="dense"
            id="stateCounty"
            name="stateCounty"
            label="State/Province"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={accommodation.postalCode}
            inputProps={{ "data-testid": "postalCode" }}
            autoFocus
            margin="dense"
            id="postalCode"
            name="postalCode"
            label="Postal/Zip Code"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={accommodation.countryCode}
            inputProps={{ "data-testid": "countryCode" }}
            autoFocus
            margin="dense"
            id="countryCode"
            name="countryCode"
            label="Country"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} data-testid="saveAccommodationDetails">
            Save Accommodation Details
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
