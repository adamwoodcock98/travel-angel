import React from "react";
import moment from "moment";
import "./transferCard.css";
import Upload from "../../upload/upload";

export const InboundTransferCard = ({ inboundTransfer }) => {
  const formatDate = (time) => moment(time).format("dddd, MMMM Do YYYY");
  const formatTime = (time) => moment(time).format("HH:mm");

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

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/transfers/download/${id}`);
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
                    <p>
                      Address: {formatAddress(inboundTransfer.pickupAddress)}
                    </p>
                  )}
                </div>
              </div>
              <div className="dropoff">
                <div className="dropoff-header">
                  <h3>Dropoff</h3>
                </div>
                <div className="dropoff-body">
                  <p>{formatDate(inboundTransfer.dropoffTime)}</p>
                  <br></br>
                  <p>{formatTime(inboundTransfer.dropoffTime)}</p>
                </div>
                <div className="dropoff-address">
                  {inboundTransfer.dropoffAddress && (
                    <p>
                      Address: {formatAddress(inboundTransfer.dropoffAddress)}
                    </p>
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
                {inboundTransfer.company && <p>{inboundTransfer.company}</p>}
              </div>
              <div className="contact-number">
                {inboundTransfer.contactNumber && (
                  <p>Contact Number: {inboundTransfer.contactNumber}</p>
                )}
              </div>
            </div>
            <div className="uploads">
              <Upload cardId={inboundTransfer._id} url="dashboard/transfers" />
              {inboundTransfer.uploads.length &&
                inboundTransfer.uploads.map((upload, index) => {
                  return (
                    <button
                      onClick={() => handleSubmit(upload._id)}
                      key={index}
                    >
                      {upload.name}
                    </button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
