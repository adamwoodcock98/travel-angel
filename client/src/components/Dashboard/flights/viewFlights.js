import React from "react";

const AirportPane = (props) => {

  const data = props.data;

  return(
    <>
      <div className="airport-pane-top">
        <h1>{data.airport}</h1>
        <h2>{data.city}</h2>
      </div>
      <div className="airport-pane-middle">
        <h4>Terminal: {data.terminal} | Gate {data.gate}</h4>
      </div>
      <div className="airport-pane-bottom">
        <h4>Scheduled departure</h4>
        <h3>{data.time}</h3>
      </div>
    </>
  )

};

const FooterPane = (props) => {

  const data = props.data;

  return(
    <>
      <div className="footer-pane-left">
        <p>{data.airline}</p>
      </div>
      <div className="footer-pane-middle">
        <p>Flight: {data.flightNumber}</p>
      </div>
      <div className="footer-pane-middle">
        <p>Booking: {data.bookingReference}</p>
      </div>
    </>
  );

}

export const FlightCard = (props) => {

  const flightData = props.outboundFlight;

  const departureData = {
    airport: flightData.departureAirport,
    city: flightData.departureCity,
    terminal: flightData.departureTerminal,
    gate: flightData.departureGate,
    time: flightData.departureTime,
  }

  const arrivalData = {
    airport: flightData.arrivalAirport,
    city: flightData.arrivalCity,
    terminal: flightData.arrivalTerminal,
    gate: flightData.arrivalGate,
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