import React from "react";
import moment from "moment";
import "./transferCard.css";
import Upload from "../../upload/upload";

export const OutboundTransferCard = ({ outboundTransfer, handleUpload }) => {
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
      {outboundTransfer.map((outboundTransfer, index) => {
        return (
          <div className="transfer-card" key={index}>
            <div className="header">
              <h1>{outboundTransfer.name}</h1>
            </div>
            <div className="body">
              <div className="pickup">
                <div className="pickup-header">
                  <h3>Pickup</h3>
                </div>
                <div className="pickup-body">
                  <p>{formatDate(outboundTransfer.pickupTime)}</p>
                  <br></br>
                  <p>{formatTime(outboundTransfer.pickupTime)}</p>
                </div>
                <div className="pickup-address">
                  {outboundTransfer.pickupAddress && (
                    <p>
                      Address: {formatAddress(outboundTransfer.pickupAddress)}
                    </p>
                  )}
                </div>
              </div>
              <div className="dropoff">
                <div className="dropoff-header">
                  <h3>Dropoff</h3>
                </div>
                <div className="dropoff-body">
                  <p>{formatDate(outboundTransfer.dropoffTime)}</p>
                  <br></br>
                  <p>{formatTime(outboundTransfer.dropoffTime)}</p>
                </div>
                <div className="dropoff-address">
                  {outboundTransfer.dropoffAddress && (
                    <p>
                      Address: {formatAddress(outboundTransfer.dropoffAddress)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="booking-reference">
                {outboundTransfer.bookingReference && (
                  <p>Booking Reference: {outboundTransfer.bookingReference}</p>
                )}
              </div>
              <div className="company">
                {outboundTransfer.company && <p>{outboundTransfer.company}</p>}
              </div>
              <div className="contact-number">
                {outboundTransfer.contactNumber && (
                  <p>Contact Number: {outboundTransfer.contactNumber}</p>
                )}
              </div>
            </div>
            <div className="uploads">
              <Upload
                cardId={outboundTransfer._id}
                url="dashboard/transfers"
                handleUpload={handleUpload}
              />
              {outboundTransfer.uploads.length &&
                outboundTransfer.uploads.map((upload, index) => {
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
