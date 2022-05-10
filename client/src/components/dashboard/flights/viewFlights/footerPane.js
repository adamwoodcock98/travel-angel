import React from "react";
import "./flightCard.css"
import Button from "@mui/material/Button";
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';


export const FooterPane = (props) => {

  const data = props.data;
  const airport = props.airport;

  const handleDirections = (address) => {
    return "https://www.google.com/maps/search/?api=1&query="+formatAddressMaps(address)
   }

  const formatAddressMaps = (address) => {
    console.log(address)
    return address.split().join("+");
  };

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
      <div className="directions">
        <Button color="secondary" startIcon={<DirectionsOutlinedIcon />} href={handleDirections(airport)} target="_blank">Get Directions</Button>        
      </div>
    </>
  );

}