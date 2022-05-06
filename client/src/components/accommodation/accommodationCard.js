import React from "react";
import moment from "moment";
import "./accommodationCard.css";

export default function AccommodationCard({ accommodation }) {
  const formatDate = (time) => moment(time).format("dddd, MMMM Do YYYY");

  const formatAddress = (address) => {
    const addressObject = address;
    delete addressObject._id;
    delete addressObject.__v;
    const arrayOfAddressValues = Object.values(addressObject);
    const onlyDefinedAddressValues = arrayOfAddressValues.filter(
      (addressValue) => addressValue !== undefined
    );
    return onlyDefinedAddressValues.join(", ");
  };

  return (
    <div className="accommodation card-container">
      <div className="header">
        <h1>{accommodation[0].name}</h1>
      </div>
      <div className="body">
        <div className="check-in">
          <div className="check-in-header">
            <h3>Check-In</h3>
          </div>
          <div className="check-in-body">
            <p>
              {formatDate(accommodation[0].checkInDate)}
              {accommodation[0].checkInTime}
            </p>
          </div>
        </div>
        <div className="check-out">
          <div className="check-out-header">
            <h3>Check-Out</h3>
          </div>
          <div className="check-out-body">
            <p>
              {formatDate(accommodation[0].checkOutDate)}
              {accommodation[0].checkOutTime}
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="booking-reference">
          {accommodation[0].bookingReference && (
            <p>Booking Reference: {accommodation[0].bookingReference}</p>
          )}
        </div>
        <div className="address">
          {accommodation[0].address && (
            <p>Address: {formatAddress(accommodation[0].address)}</p>
          )}
        </div>
        <div className="contact-number">
          {accommodation[0].contactNumber && (
            <p>Contact Number: {accommodation[0].contactNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
}
