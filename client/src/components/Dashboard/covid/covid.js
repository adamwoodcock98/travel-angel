import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaygroundSpeedDial from "./covidSpeedDial";
import TestCard from "./tests/testCard";

const Covid = () => {
  const [testData, setTestData] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/covid/"
  })

  useEffect(() => {
    api.get("/").then(res => {
      const tests = res.data.tests;
      setTestData(tests);
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
        <PlaygroundSpeedDial />
      </>
    )
  }
}

export default Covid;