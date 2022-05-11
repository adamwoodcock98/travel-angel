import React, { useState, useEffect } from "react";
import axios from "axios";
import TestCard from "./tests/testCard";
import VaccineCard from "./vaccinations/vaccineCard";
import "./covid.css"
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddTest from "./tests/newTest"
import { Alerts } from "../../assets/snackbar";
import CircularProgress from '@mui/material/CircularProgress';
// import { useParams } from "react-router-dom";

const Covid = (props) => {
  const [testData, setTestData] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);
  const [didUpdate, setDidUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // const { tripId } = useParams();
  const userId = props.session;
  const [test, setTest] = useState({
    testType: "",
    entryType: "",
    result: "",
    testDate: "",
    testFromDate: "",
    resultByDate: "",
    validToDate: "",
    testNumber: "",
    testCountry: "",
    testProvider: "",
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/covid/"
  })

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDidUpdate(!didUpdate);
  };

  useEffect(() => {
    setLoading(true);
    api.get("/").then(res => {
      const tests = res.data.tests;
      const vaccines = res.data.vaccinations;
      setTestData(tests);
      setVaccineData(vaccines[0]);
    })      
    .catch((error) => {
      if (error.response.status) {
        handleAlert(
          error.response.status + " - " + error.response.statusText,
          "error"
        );
      } else {
        handleAlert(
          "There was a problem connecting to the server.",
          "error"
        );
      }
    })
    .finally(() => setLoading(false));

  }, [didUpdate]);

  if (loading) {
    return(
      <div className="loading" style={{ display: loading ? "" : "none"}} >
        <CircularProgress color="secondary" />
        <p color="secondary">loading...</p>
      </div>
    )
  } else if (vaccineData) {
    const testsArray =[]
    testData.forEach(test => {
      testsArray.push(<TestCard testData={test} userId={userId} refresh={handleClose} />);
    })
    return(
      <>
        <div className="covid-window">
          <div className="covid-header">
            <h1>Covid-19</h1>
          </div>
          <div className="covid-content">
            <div className="covid-content-vaccinations">
              <VaccineCard vaccinationsData={vaccineData} refresh={handleClose} />
            </div>
            <div className="covid-content-testing">
              <h1>Tests</h1>
              {testData[0] && testsArray}
              {!testData[0] &&
                <div className="empty-prompt">
                  <h3>Looks like you don't have any saved tests</h3>
                  <h2>Press + to get started</h2>
                </div>
              }
            <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
              <AddIcon />
            </Fab>
            </div>
          </div>
          <div className="covid-footer">
            <AddTest
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              testData={test}
              userId={userId}
              testID={null}
            />     
            <Alerts
              message={alertMessage}
              open={alertOpen}
              handleClose={handleAlertClose}
              alertPosition={alertPosition}
              alertType={alertType}
            />       
          </div>
        </div>
      </>
    )
  }
}

export default Covid;