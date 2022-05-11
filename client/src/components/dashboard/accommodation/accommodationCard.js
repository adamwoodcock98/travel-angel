import React from "react";
import moment from "moment";
import CrudMenu from "./crud/crud"
import "./accommodationCard.css";
import Button from "@mui/material/Button";
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import "../../assets/styling/cards.css"

export default function AccommodationCard(props) {
  const userId = props.userId;
  const accommodation = props.accommodation;
  const handleDirections = props.handleDirections;
  const formatDate = (date) => moment(date).format("dddd, MMMM Do YYYY");

  const formatAddress = (address) => {
    const addressObject = address;
    delete addressObject._id;
    delete addressObject.__v;
    const arrayOfAddressValues = Object.values(addressObject);
    const onlyDefinedAddressValues = arrayOfAddressValues.filter(
      (addressValue) => addressValue !== ""
    );
    return onlyDefinedAddressValues.join(", ");
  };

  return (
    <div className="card-container">
      {accommodation.map((accommodation, index) => {
        return (
          <div className="accommodation">
            <div className="accommodation-card" key={index}>
              <div className="header">
                <h1>{accommodation.name}</h1>
              </div>
              <div className="body">
                <div className="check-in">
                  <div className="check-in-header">
                    <h3>Check-In</h3>
                  </div>
                  <div className="check-in-body">
                    <p>{formatDate(accommodation.checkInDate)}</p>
                    <br></br>
                    <p>Check-in opens at {accommodation.checkInTime}</p>
                  </div>
                </div>
                <div className="check-out">
                  <div className="check-out-header">
                    <h3>Check-Out</h3>
                  </div>
                  <div className="check-out-body">
                    <p>{formatDate(accommodation.checkOutDate)}</p>
                    <br></br>
                    <p>Check-out by {accommodation.checkOutTime}</p>
                  </div>
                </div>
              </div>
              <div className="footer">
                <div className="booking-reference">
                  {accommodation.bookingReference && (
                    <p>Booking Reference: {accommodation.bookingReference}</p>
                  )}
                </div>
                <div className="address">
                  {accommodation.address && (
                    <p>Address: {formatAddress(accommodation.address)}</p>
                  )}
                </div>
                <div className="contact-number">
                  {accommodation.contactNumber && (
                    <p>Contact Number: {accommodation.contactNumber}</p>
                  )}
                </div>
                  <div className="directions">
                    <Button color="secondary" startIcon={<DirectionsOutlinedIcon />} target="_blank" href={handleDirections(accommodation.address)}>Get Directions</Button>
                  </div>
              </div>
            </div>
            <div className="crud-menu">
              <CrudMenu userId={userId} accommodationData={accommodation} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
