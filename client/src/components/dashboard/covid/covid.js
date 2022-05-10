import React, { useState, useEffect } from "react";
import axios from "axios";
import TestCard from "./tests/testCard";
import VaccineCard from "./vaccinations/vaccineCard";
import "./covid.css"
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddTest from "./tests/newTest"
// import { useParams } from "react-router-dom";

const Covid = (props) => {
  const [testData, setTestData] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);
  const [didUpdate, setDidUpdate] = useState(false);
  const [open, setOpen] = useState(false);
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
    api.get("/").then(res => {
      const tests = res.data.tests;
      const vaccines = res.data.vaccinations;
      setTestData(tests);
      setVaccineData(vaccines[0]);
    })
  }, [didUpdate]);

  if (testData.length) {

    const testsArray =[]
    testData.forEach(test => {
      testsArray.push(<TestCard testData={test} userId={userId} />);
    })

    return(
      <>
        <div className="covid-window">
          <div className="covid-header">
            <h1>Your Coronavirus Documentation</h1>
          </div>
          <div className="covid-content">
            <div className="covid-content-vaccinations">
              <h1>Vaccinations</h1>
              <VaccineCard vaccinationsData={vaccineData}/>
            </div>
            <div className="covid-content-testing">
              <h1>Tests</h1>
              {testData[0] && testsArray}
            </div>
          </div>
          <div className="covid-footer">
            <Fab size="large" color="secondary" aria-label="add" onClick={handleOpen}>
              <AddIcon />
            </Fab>
            <AddTest
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              testData={test}
              userId={userId}
              testID={null}
            />            
          </div>
        </div>
      </>
    )
  }
}

export default Covid;