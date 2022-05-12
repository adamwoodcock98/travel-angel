import React from "react";
import "./flightCard.css";
import Button from "@mui/material/Button";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";

export const FooterPane = (props) => {
  const data = props.data;
  const airport = props.airport;

  const handleDirections = (address) => {
    return (
      "https://www.google.com/maps/search/?api=1&query=" +
      formatAddressMaps(address)
    );
  };

  const formatAddressMaps = (address) => {
    console.log(address);
    return address.split().join("+");
  };

  return (
    <div className="footer">
      <div className="flight-card-footer">
        <div className="labels">
          <div className="footer-pane-left light-label">
            <p>Airline</p>
          </div>
          <div className="footer-pane-middle light-label">
            <p>Flight</p>
          </div>
          <div className="footer-pane-right light-label">
            <p>Booking</p>
          </div>
        </div>
        <div className="footer-text">
          <div className="footer-pane-left">
            <h3>{data.airline && data.airline}</h3>
            <h3>{!data.airline && "-"}</h3>
          </div>
          <div className="footer-pane-middle">
            <h3>{data.flightNumber && data.flightNumber}</h3>
            <h3>{!data.flightNumber && "-"}</h3>
          </div>
          <div className="footer-pane-right">
            <h3>{data.bookingReference && data.bookingReference}</h3>
            <h3>{!data.bookingReference && "-"}</h3>
          </div>
        </div>
      </div>
      <div className="footer-directions">
        <Button
          color="primary"
          variant="outlined"
          startIcon={<DirectionsOutlinedIcon color="primary" />}
          href={handleDirections(airport)}
          target="_blank"
        >
          Directions to airport
        </Button>
      </div>
    </div>
  );
};
