import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from '@mui/lab/LoadingButton';

export default function AddParking(
  {
  open,
  handleOpen,
  handleClose,
  handleChange,
  parking,
  onSubmit,
  handleLoadingClick,
  loading
}) {
  return (
    <div>
      <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Parking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store your parking details
          </DialogContentText>
          <TextField
            value={parking.startDate}
            autoFocus
            margin="dense"
            id="startDate"
            name="startDate"
            label="Start Date & Time"
            type="datetime-local"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={parking.endDate}
            autoFocus
            margin="dense"
            id="endDate"
            name="endDate"
            label="End Date & Time"
            type="datetime-local"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={parking.airport}
            autoFocus
            margin="dense"
            id="airport"
            name="airport"
            label="Airport"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.type}
            autoFocus
            margin="dense"
            id="type"
            name="type"
            label="Car Park Type"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.regPlate}
            autoFocus
            margin="dense"
            id="regPlate"
            name="regPlate"
            label="Vehicle Registration"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.company}
            autoFocus
            margin="dense"
            id="company"
            name="company"
            label="Company"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.contactNumber}
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
            value={parking.bookingReference}
            autoFocus
            margin="dense"
            id="bookingReference"
            name="bookingReference"
            label="Booking Reference"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.notes}
            autoFocus
            margin="dense"
            id="notes"
            name="notes"
            label="Notes"
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={parking.buildingNumber}
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
            value={parking.buildingName}
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
            value={parking.addressLine1}
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
            value={parking.addressLine2}
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
            value={parking.city}
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
            value={parking.stateCounty}
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
            value={parking.postalCode}
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
            value={parking.countryCode}
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
          
          <Button onClick={onSubmit}>Save Parking Details</Button>
          <LoadingButton
            onClick={handleLoadingClick}
            loading={loading}
            loadingIndicator="Saved"
          > 
            Save and Add Another
          </LoadingButton>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
