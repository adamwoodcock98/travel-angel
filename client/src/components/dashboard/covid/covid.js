import React, { useState, useEffect } from "react";
import axios from "axios";
import TestCard from "./tests/testCard";
import VaccineCard from "./vaccinations/vaccineCard";
import "./covid.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddTest from "./tests/newTest";
import { useParams } from "react-router-dom";

const Covid = ({ session }) => {
  const [testData, setTestData] = useState([]);
  const [vaccineData, setVaccineData] = useState();
  const [open, setOpen] = useState(false);
  const [didLoad, setDidLoad] = useState(false);
  const { tripId } = useParams();
  const userId = session;
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
    user: userId,
    trip: tripId,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(`http://localhost:8000/dashboard/covid/${userId}`);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/dashboard/covid/${userId}/${tripId}`)
      .then((res) => {
        const tests = res.data.tests;
        const vaccines = res.data.vaccinations;
        setTestData(tests);
        setVaccineData(vaccines);
        console.log(vaccines);
        setDidLoad(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  console.log(testData, "this is the test data");

  console.log(vaccineData, "this is the vaccine date");

  if (didLoad && testData.length) {
    const testsArray = [];
    testData.forEach((test) => {
      testsArray.push(<TestCard testData={test} userId={userId} />);
    });
    console.log("This is the tests array", testsArray.length);
    return (
      <>
        <div className="covid-window">
          <div className="covid-header">
            <h1>Your Coronavirus Documentation</h1>
          </div>
          <div className="covid-content">
            <div className="covid-content-vaccinations">
              <h1>Vaccinations</h1>
              <VaccineCard vaccinationsData={vaccineData} />
            </div>
            <div className="covid-content-testing">
              <h1>Tests</h1>
              {testsArray}
            </div>
          </div>
          <div className="covid-footer">
            <Fab
              size="large"
              color="secondary"
              aria-label="add"
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
            <AddTest
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              testData={test}
              userId={userId}
              testID={null}
              tripId={tripId}
            />
          </div>
        </div>
      </>
    );
  } else if (didLoad) {
    console.log("if/else");
    return (
      <>
        <div className="covid-window">
          <div className="covid-header">
            <h1>Your Coronavirus Documentation</h1>
          </div>
          <div className="covid-content">
            <div className="covid-content-vaccinations">
              <h1>Vaccinations</h1>
              <VaccineCard vaccinationsData={vaccineData} />
            </div>
            <div className="covid-content-testing">
              <h1>Tests</h1>
            </div>
          </div>
          <div className="covid-footer">
            <Fab
              size="large"
              color="secondary"
              aria-label="add"
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
            <AddTest
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              testData={test}
              userId={userId}
              testID={null}
              tripId={tripId}
            />
          </div>
        </div>
      </>
    );
  } else {
    return <h1>loading</h1>;
  }
};

export default Covid;
