import React from 'react';
import moment from 'moment';
import "./transferCard.css";
import CrudMenu from "./crud/crud"

export const InboundTransferCard = (props) => {
    const inboundTransfer = props.inboundTransfer;
    const userId = props.userId;
    const tripId = props.tripId;
    const refresh = props.refresh;

    const formatDate = (time) => moment(time).format("dddd, MMMM Do YYYY");
    const formatTime = (time) => moment(time).format('HH:mm');

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
      {inboundTransfer.map((inboundTransfer, index) => {
        return (
          <div className="transfer-card" key={index}>
            <div className="header">
              <h1>{inboundTransfer.name}</h1>
            </div>
            <div className="body">
              <div className="pickup">
                <div className="pickup-header">
                  <h3>Pickup</h3>
                </div>
                <div className="pickup-body">
                  <p>{formatDate(inboundTransfer.pickupTime)}</p>
                  <br></br>
                  <p>{formatTime(inboundTransfer.pickupTime)}</p>
                </div>
                <div className="pickup-address">
                {inboundTransfer.pickupAddress && (
                  <p>Address: {formatAddress(inboundTransfer.pickupAddress)}</p>
                )}
              </div>
              </div>
              <div className="dropoff">
                <div className="dropoff-header">
                  <h3>Dropoff</h3>
                  <CrudMenu transferData={inboundTransfer} transferId={inboundTransfer._id} userId={userId} tripId={tripId} refresh={refresh} />
                </div>
                <div className="dropoff-body">
                  <p>{formatDate(inboundTransfer.dropoffTime)}</p>
                  <br></br>
                  <p>{formatTime(inboundTransfer.dropoffTime)}</p>
                </div>
                <div className="dropoff-address">
                {inboundTransfer.dropoffAddress && (
                  <p>Address: {formatAddress(inboundTransfer.dropoffAddress)}</p>
                )}
              </div>
              </div>
            </div>
            <div className="footer">
              <div className="booking-reference">
                {inboundTransfer.bookingReference && (
                  <p>Booking Reference: {inboundTransfer.bookingReference}</p>
                )}
              </div>
              <div className="company">
                {inboundTransfer.company && (
                  <p>{inboundTransfer.company}</p>
                )}
              </div>
              <div className="contact-number">
                {inboundTransfer.contactNumber && (
                  <p>Contact Number: {inboundTransfer.contactNumber}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}