import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';

export default function AddVisa({
  open,
  handleOpen,
  handleClose,
  handleChange,
  visa,
  handleSubmit,
}) {
  return (
    <div>
      <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Visa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store your visa details
          </DialogContentText>
          <TextField
            value={visa.visaNumber}
            autoFocus
            margin="dense"
            id="visaNumber"
            name="visaNumber"
            label="Visa Number"
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
          />
          <TextField
            value={visa.startDate}
            autoFocus
            margin="dense"
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={visa.endDate}
            autoFocus
            margin="dense"
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            value={visa.issuingCountry}
            autoFocus
            margin="dense"
            id="issuingCountry"
            name="issuingCountry"
            label="Issuing Country"
            type="string"
            variant="outlined"
            required
            onChange={handleChange}
          />  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Save Visa Details</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
