import React from "react";
import moment from "moment";
import "./transferCard.css";
import CrudMenu from "./crud/crud";
import Upload from "../../upload/upload";
import Button from "@mui/material/Button";
import "../../assets/styling/cards.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export const InboundTransferCard = (props) => {
  const inboundTransfer = props.inboundTransfer;
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
      {inboundTransfer.map((inboundTransfer, index) => {
        return (
          <div className="card" key={index}>
            <div className="crud-menu">
              <CrudMenu
                transferData={inboundTransfer}
                transferId={inboundTransfer._id}
                userId={userId}
                tripId={tripId}
                refresh={refresh}
               />            
              </div>
            <div className="header">
              <h1>{inboundTransfer.name}</h1>
            </div>
            <div className="body">
              <div className="subbody-left">
                <div className="pickup-header">
                  <h2>Pickup</h2>
                </div>
                <div className="pickup-body">
                  <p>{formatDate(inboundTransfer.pickupTime)}</p>
                  <p>{formatTime(inboundTransfer.pickupTime)}</p>
                  <div className="address">
                  {inboundTransfer.pickupAddress && (
                    <p>Address: {formatAddress(inboundTransfer.pickupAddress)}</p>
                  )}
                </div>
              </div>
            </div>
              <div className="subbody-right">
                <div className="dropoff-header">
                  <h2>Dropoff</h2>
                </div>
                <div className="dropoff-body">
                  <p>{formatDate(inboundTransfer.dropoffTime)}</p>
                  <p>{formatTime(inboundTransfer.dropoffTime)}</p>
                  <div className="address">
                  {inboundTransfer.dropoffAddress && (
                    <p>Address: {formatAddress(inboundTransfer.dropoffAddress)}</p>
                  )}
                </div>
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
                <p>TEL: {inboundTransfer.contactNumber}</p>
              )}
            </div>
            <div className="upload">
              <div className="uploads">
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="documents"
                >
                  <h4>Documents</h4>
                  <Upload
                    cardId={inboundTransfer._id}
                    url="dashboard/transfers"
                    handleUpload={handleUpload}
                  />
                </div>
                <i>
                  Use this section to store any additional documents you may
                  need for your flights
                </i>
                {inboundTransfer.uploads.length &&
                  inboundTransfer.uploads.map((upload, index) => {
                    return (
                      <div className="document-button">
                        <Button
                          style={{ padding: "0%" }}
                          color="primary"
                          onClick={() => handleSubmit(upload._id)}
                          key={index}
                          endIcon={<FileDownloadOutlinedIcon />}
                        >
                          {upload.name}
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
};
