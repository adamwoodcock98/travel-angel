import React from "react";
import moment from "moment";
import "./transferCard.css";
import CrudMenu from "./crud/crud";
import Upload from "../../upload/upload";
import Button from "@mui/material/Button";
import "../../assets/styling/cards.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export const OutboundTransferCard = (props) => {
  const outboundTransfer = props.outboundTransfer;
  const userId = props.userId;
  const tripId = props.tripId;
  const refresh = props.refresh;
  const handleUpload = props.handleUpload;
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
          <div className="card" key={index}>
            
            <div className="header">
              <h1 className="title">{outboundTransfer.name}</h1>
              <div className="crud-menu">
              <CrudMenu transferData={outboundTransfer} transferId={outboundTransfer._id} userId={userId} tripId={tripId} refresh={refresh} />
            </div>
            </div>
            <div className="body">
              <div className="subbody-left">
                <div className="pickup-header">
                  <h3>Pickup</h3>
                </div>
                <div className="pickup-body">
                  <p>{formatDate(outboundTransfer.pickupTime)}</p>
                  <p>{formatTime(outboundTransfer.pickupTime)}</p>
                  <div className="address">
                    {outboundTransfer.pickupAddress && (
                      <p>
                        Address: {formatAddress(outboundTransfer.pickupAddress)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="subbody-right">
                  <div className="dropoff-header">
                    <h3>Dropoff</h3>
                  </div>
                  <div className="dropoff-body">
                    <p>{formatDate(outboundTransfer.dropoffTime)}</p>
                    <p>{formatTime(outboundTransfer.dropoffTime)}</p>
                    <div className="address">
                      {outboundTransfer.dropoffAddress && (
                        <p>
                          Address:{" "}
                          {formatAddress(outboundTransfer.dropoffAddress)}
                        </p>
                      )}
                    </div>
                  </div>
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
                  <p>TEL: {outboundTransfer.contactNumber}</p>
                )}
              </div>
              <div className="upload">
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
          </div>
        );
      })}
    </div>
  );
};
