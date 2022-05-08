import React from "react";
import "./flightCard.css"
import { AirportPane } from "./airportPane"
import { FooterPane } from "./footerPane"

export const FlightCard = (props) => {

  const flightData = props.outboundFlight;

  const departureData = {
    airport: flightData.departureAirport,
    city: flightData.departureCity,
    terminal: flightData.departureTerminal,
    gate: flightData.departureGate,
    time: flightData.departureTime,
    date: flightData.departureDate,
    isDeparture: true,
  }

  const arrivalData = {
    airport: flightData.arrivalAirport,
    city: flightData.arrivalCity,
    terminal: flightData.arrivalTerminal,
    gate: flightData.arrivalGate,
    isDeparture: false,
  }

  const footerData = {
    airline: flightData.airline,
    flightNumber: flightData.flightNumber,
    bookingReference: flightData.bookingReference,
  }

  return(
    <div className="flight-card">
      <div className="flight-card-content">
        <div className="flight-card-arrival-pane">
          <AirportPane data={departureData} />
        </div>
        <div className="flight-card-departure-pane">
          <AirportPane data={arrivalData} />
        </div>
      </div>
      <div className="flight-card-footer">
        <FooterPane data={footerData} />
      </div>
    </div>
  )

};