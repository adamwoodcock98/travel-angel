import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaygroundSpeedDial from "./covidSpeedDial";
import TestCard from "./tests/testCard";

const Covid = () => {
  const [testData, setTestData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:8000/dashboard/covid/"
  })

  useEffect(() => {
    api.get("/").then(res => {
      setTestData(res.data.testData);
      setIsLoaded(true);
    })
  }, []);

  if (isLoaded) {
    return(
      <>
        <TestCard props={testData} />
        <PlaygroundSpeedDial />
      </>
    )
  }
}

export default Covid;