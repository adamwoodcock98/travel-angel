import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const Address = ({ address, handleChange, handleSubmit }) => {
  return (
    <form>
      <TextField
        value={address.buildingNumber}
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
        value={address.buildingName}
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
        value={address.addressLine1}
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
        value={address.addressLine2}
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
        value={address.city}
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
        value={address.stateCounty}
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
        value={address.postalCode}
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
        value={address.countryCode}
        autoFocus
        margin="dense"
        id="countryCode"
        name="countryCode"
        label="Country"
        type="text"
        variant="outlined"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Save Address</Button>
    </form>
  );
};