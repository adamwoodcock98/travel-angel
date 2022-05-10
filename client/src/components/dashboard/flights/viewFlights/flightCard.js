import React from "react";
import "./flightCard.css";
import { AirportPane } from "./airportPane";
import { FooterPane } from "./footerPane";
import Upload from "../../../upload/upload";

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
  };

  const arrivalData = {
    airport: flightData.arrivalAirport,
    city: flightData.arrivalCity,
    terminal: flightData.arrivalTerminal,
    gate: flightData.arrivalGate,
    isDeparture: false,
  };

  const footerData = {
    airline: flightData.airline,
    flightNumber: flightData.flightNumber,
    bookingReference: flightData.bookingReference,
  };

  const handleSubmit = async (id) => {
    // setState((prev) => prev + 1);
    window.open(`http://localhost:8000/dashboard/flights/download/${id}`);
  };

  return (
    <div className="flight-card">
      <div className="flight-card-content">
        <div className="upload">
          <Upload cardId={flightData._id} url="dashboard/flights" />
          <div className="uploads">
            Download Your Documents
            {flightData.uploads.length &&
              flightData.uploads.map((upload, index) => {
                return (
                  <button onClick={() => handleSubmit(upload._id)} key={index}>
                    {upload.name}
                  </button>
                );
              })}
          </div>
        </div>
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
  );
};
