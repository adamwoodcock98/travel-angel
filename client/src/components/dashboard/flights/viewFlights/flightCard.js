import React from "react";
import "./flightCard.css";
import { AirportPane } from "./airportPane";
import { FooterPane } from "./footerPane";
import CrudMenu from "./crud/crud";
import Upload from "../../../upload/upload";
import "../../../assets/styling/cards.css"

export const FlightCard = (props) => {
  const handleUpload = props.handleUpload;

  console.log("ugvugvuytvygv", handleUpload);

  const flightData = props.outboundFlight;
  const userId = props.userId;
  const refresh = props.refresh;

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
    window.open(`http://localhost:8000/dashboard/flights/download/${id}`);
  };

  return (
    <div className="card-container">
    <div className="flight-card">
      <div className="flight-card-content">
        <div className="upload">
          <Upload
            cardId={flightData._id}
            url="dashboard/flights"
            handleUpload={handleUpload}
          />
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
        <div className="flight-card-crud">
          <CrudMenu userId={userId} flightData={flightData} refresh={refresh} />
        </div>
      </div>
      <div className="flight-card-footer">
        <FooterPane data={footerData} airport={departureData.airport} />
      </div>
    </div>
    </div>
  );
};
