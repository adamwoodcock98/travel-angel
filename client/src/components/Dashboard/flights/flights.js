import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FlightCard } from "./viewFlights";


const Flights = () => {

  const [inboundFlight, setInboundFlight] = useState([]);
  const [outboundFlight, setOutboundFlight] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:5000/dashboard/flights/"
  })

  useEffect(() => {
    api.get("/").then(res => { 
      console.log(res.data)
      const outbound = res.data.outbound                        //.map(flight => JSON.stringify(flight))
      const inbound = res.data.inbound
      setOutboundFlight(outbound);
      setInboundFlight(inbound);
    });
  }, [])

  if (outboundFlight.length) {
    return(
      <>
        <FlightCard outboundFlight={outboundFlight[0]} />
      </>
    )
  } else {
    return(
      <>Loading</>
    )
  }
  
};

export default Flights; 