import React, { useState, useEffect } from "react";
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

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const AddTest = (props) => {
  const open = props.open
  const handleClose = props.handleClose
  const type = props.type || "";
  const testType = props.testType || "";
  const testID = props.testID || null

const [test, setTest] = useState({
    testType: testType,
    entryType: type,
    result: "",
    testDate: "",
    testFromDate: "",
    resultByDate: "",
    validToDate: "",
    testNumber: "",
    testCountry: "",
    testProvider: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setTest({
      ...test,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { entryType, testType, isReminder, result, testDate, testFromDate, resultByDate, validToDate, testNumber, testCountry, testProvider } = test;

    const newTest = { entryType, testType, isReminder, result, testDate, testFromDate, resultByDate, validToDate, testNumber, testCountry, testProvider, testID };
    
    let url;

    if (testID) {
      url = "http://localhost:8000/dashboard/covid/test/edit"
    } else {
      url = "http://localhost:8000/dashboard/covid/test"
    }
    axios
      .post(url, newTest)
      .then((res) => {
        handleClose();
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the fields to store the details of your Covid test
          </DialogContentText>
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel id="demo-select">Add new</InputLabel>
            <Select
              value={test.entryType}
              margin="dense"
              id="entryType"
              name="entryType"
              label="Save as"
              variant="outlined"
              onChange={handleChange}
              required
            >
              <MenuItem value={"Result"}>Result</MenuItem>
              <MenuItem value={"Reminder"}>Reminder</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel id="demo-select-small">Test type</InputLabel>
            <Select
              value={test.testType}
              margin="dense"
              id="testType"
              name="testType"
              label="Test Type"
              variant="outlined"
              onChange={handleChange}
              required
            >
              <MenuItem value={"PCR"}>PCR</MenuItem>
              <MenuItem value={"Lateral Flow"}>Lateral Flow</MenuItem>
              <MenuItem value={"Antigen"}>Antigen</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: test.entryType === "Result" ? "" : "none" }}>
            <FormControl sx={{ minWidth: 190 }}>
              <InputLabel id="demo-select-small">Result</InputLabel>
              <Select
                value={test.result}
                margin="dense"
                id="result"
                name="result"
                label="Result"
                variant="outlined"
                onChange={handleChange}
                required
              >
                <MenuItem value={"Positve"}>Positive</MenuItem>
                <MenuItem value={"Lateral Flow"}>Negative</MenuItem>
                <MenuItem value={"Indeterminate"}>Indeterminate</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={test.testDate}
              autoFocus
              margin="dense"
              id="testDate"
              name="testDate"
              label="Test date"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              value={test.validToDate}
              autoFocus
              margin="dense"
              id="validToDate"
              name="validToDate"
              label="Valid until"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              value={test.testNumber}
              autoFocus
              margin="dense"
              id="testNumber"
              name="testNumber"
              label="Test number"
              type="text"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              value={test.testCountry}
              autoFocus
              margin="dense"
              id="testCountry"
              name="testCountry"
              label="Test country"
              type="text"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              value={test.testProvider}
              autoFocus
              margin="dense"
              id="testProvider"
              name="testProvider"
              label="Test provider"
              type="text"
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div style={{ display: test.entryType === "Reminder" ? "" : "none" }}>
            <TextField
              value={test.testFromDate}
              autoFocus
              margin="dense"
              id="testFromDate"
              name="testFromDate"
              label="Test from"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <TextField
              value={test.resultByDate}
              autoFocus
              margin="dense"
              id="resultByDate"
              name="resultByDate"
              label="Results by"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save Test Details</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTest;