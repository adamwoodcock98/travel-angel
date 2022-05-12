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
          <div className="outbound-transfer-card" key={index}>
            <div className="header">
              <h1 className="title">{outboundTransfer.name}</h1>
              
                
              <div className="crud-menu">
                <CrudMenu
                  transferData={outboundTransfer}
                  transferId={outboundTransfer._id}
                  userId={userId}
                  tripId={tripId}
                  refresh={refresh}
                  handleUpload={handleUpload}
                />
              </div>
            </div>
            <div className="transfer-body">
              
              <div className="pickup-content">
                
                <div className="pickup-body">
                <div className="pickup-header">
                  <p className="light-label">Pickup</p>
                </div>
                  <p>{formatDate(outboundTransfer.pickupTime)}</p>
                  <p className="pink">{formatTime(outboundTransfer.pickupTime)}</p>
                  <div className="pickup-address">
                    <p className="light-label font-labels">Address: </p>
                    {outboundTransfer.pickupAddress && (
                      <h4>{formatAddress(outboundTransfer.pickupAddress)}</h4>
                    )}
                  </div>
                </div>
              </div>
            
                <div className="dropoff-content">
                  
                  <div className="dropoff-body">
                 
                <div className="dropoff-header">
                  <p className="light-label">Dropoff</p>
                  </div>
                    <p>{formatDate(outboundTransfer.dropoffTime)}</p>
                    <p className="pink">{formatTime(outboundTransfer.dropoffTime)}</p>
                    <div className="dropoff-address">
                      <p className="light-label font-labels">Address: </p>
                      {outboundTransfer.dropoffAddress && (
                        <h4>
                          {formatAddress(outboundTransfer.dropoffAddress)}
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            
            {/* FOOTER  */}
            <div className="transfer-footer">
                <div className="footer-labels">
                  <div className="footer-left light-label">
                    <p>Booking Reference: </p>
                  </div>
                  <div className="footer-middle light-label">
                    <p>Company: </p>
                  </div>
                  <div className="footer-right light-label">
                    <p>TEL:</p>
                  </div>
                </div>

                <div className="footer-text">
                  <div className="footer-left">
                      {outboundTransfer.bookingReference && (
                      <h4>{outboundTransfer.bookingReference}</h4>
                      )}
                  </div>
                  <div className="footer-middle">
                    {outboundTransfer.company && <h4>{outboundTransfer.company}</h4>}
                  </div>
                    <div className="footer-right">
                      <div className="tel">
                        {outboundTransfer.contactNumber && (
                          <h4>{outboundTransfer.contactNumber}</h4>
                        )}
                      </div>
                    </div>
                  </div>
              </div>
              <div className="upload">
                <div className="footer-uploads">
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="documents"
                  >
                    <h4>Documents</h4>
                    <Upload
                      cardId={outboundTransfer._id}
                      url="dashboard/transfers"
                      handleUpload={handleUpload}
                    />
                  </div>
                  <i>
                    Use this section to store any additional documents you may
                    need for your flights
                  </i>
                  {outboundTransfer.uploads.length &&
                    outboundTransfer.uploads.map((upload, index) => {
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
            {/* </div> */}
          </div>
        );
      })}
    </div>
  );
};
