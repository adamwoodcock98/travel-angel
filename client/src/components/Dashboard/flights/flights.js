import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FlightCard } from "./viewFlights/flightCard";
import "./flights.css"


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

  if (outboundFlight.length || inboundFlight.length) {
    return(
      <div className="flights-window">
        <div className="flights-header">
          <h1>Your flights</h1>
        </div>
        <div className="flights-content">
          <div className="flights-content-outbound">
            <h1 className="flights-content-subheading">Outbound</h1>
            {outboundFlight[0] && <FlightCard outboundFlight={outboundFlight[0]} />}
          </div>
          <div className="flights-content-inbound">
            <h1 className="flights-content-subheading">Inbound</h1>
            {inboundFlight[0] && <FlightCard outboundFlight={inboundFlight[0]} />}
          </div>
        </div>
        <div className="flights-footer">

        </div>
      </div>
    )
  } else {
    return(
      <>Loading</>
    )
  }
  
};

export default Flights; 