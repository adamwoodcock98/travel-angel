import React from "react";
import "./flightCard.css"

export const FooterPane = (props) => {

  const data = props.data;

  return(
    <>
      <div className="footer-pane-left">
        <p>{data.airline}</p>
      </div>
      <div className="footer-pane-middle">
        <p>Flight: {data.flightNumber}</p>
      </div>
      <div className="footer-pane-right">
        <p>Booking: {data.bookingReference}</p>
      </div>
    </>
  );

}