import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaygroundSpeedDial from "./covidSpeedDial";
import TestCard from "./tests/testCard";
import VaccineCard from "./vaccinations/vaccineCard";

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
        {testData[0] && testsArray}
        <VaccineCard vaccinationsData={vaccineData}/>
        <PlaygroundSpeedDial />
      </>
    )
  }
}

export default Covid;