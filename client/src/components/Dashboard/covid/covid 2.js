import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaygroundSpeedDial from "./covidSpeedDial";
import TestCard from "./tests/testCard";
import VaccineCard from "./vaccinations/vaccineCard";
import "./covid.css"

const Covid = () => {
  const [testData, setTestData] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/covid/"
  })

  useEffect(() => {
    api.get("/").then(res => {
      const tests = res.data.tests;
      const vaccines = res.data.vaccinations;
      setTestData(tests);
      setVaccineData(vaccines[0]);
    })
  }, []);

  if (testData.length) {

    const testsArray =[]
    testData.forEach(test => {
      testsArray.push(<TestCard testData={test} />);
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
            <PlaygroundSpeedDial />
          </div>
        </div>
      </>
    )
  }
}

export default Covid;