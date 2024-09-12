import React, { useEffect, useState } from "react";
import moment from "moment";
import CrudMenu from "./crud/crud";
import "./accommodationCard.css";
import Upload from "../../upload/upload";
import Button from "@mui/material/Button";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import "../../assets/styling/cards.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function AccommodationCard(props) {
  const handleUpload = props.handleUpload;
  const userId = props.userId;
  const accommodation = props.accommodation;
  const handleDirections = props.handleDirections;
  const refresh = props.refresh;
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

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/accommodation/download/${id}`);
  };

  return (
    <div className="card-container">
      {accommodation.map((accommodation, index) => {
        return (
            <div className="card" key={index}>
               
              <div className="header">
                <div className="title">
                  <h1>{accommodation.name}</h1>
                </div>
                <div className="crud-menu">
                <CrudMenu
                  userId={userId}
                  accommodationData={accommodation}
                  refresh={refresh}
                />
               </div>
              </div>
              <div className="body">
                <div className="subbody-left">
                  <div className="check-in-header">
                    <p>Check-In</p>
                  </div>
                  <div className="check-in-body">
                    <h3>{formatDate(accommodation.checkInDate)}</h3>
                    <p>Check-in opens at</p><p className="check-out-time">{accommodation.checkInTime}</p>
                  </div>
                </div>
                <div className="subbody-right">
                  <div className="check-out-header">
                    <p>Check-Out</p>
                  </div>
                  <div className="check-out-body">
                    <h3>{formatDate(accommodation.checkOutDate)}</h3>
                    <p>Check-out by</p><p className="check-out-time">{accommodation.checkOutTime}</p>
                  </div>
                </div>
              </div>
              {/* FOOTER */}
              <div className="footer">
                <div className="footer-labels">
                  <div className="footer-left">
                    <p className="light-label">Booking reference</p>
                  </div>
                  <div className="footer-middle">
                    <p className="light-label">Address</p>
                  </div>
                  <div className="footer-right">
                    <p className="light-label">TEL</p> 
                  </div>
                </div>

                <div className="footer-text">
                  <div className="footer-left">
                  {accommodation.bookingReference && (
                    <h4>{accommodation.bookingReference}</h4>
                  )}
                  </div>
                  <div className="footer-middle">
                  {accommodation.address && (
                    <h4>{formatAddress(accommodation.address)}</h4>
                  )}
                  </div>
                  <div className="footer-right">
                  {accommodation.contactNumber && (
                    <p>{accommodation.contactNumber}</p>
                  )}
                  </div>
                </div>

                <div className="directions">
                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<DirectionsOutlinedIcon />}
                    target="_blank"
                    href={handleDirections(accommodation.address)}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
              <div className="upload">
                <div className="uploads">
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="documents"
                  >
                    <h4>Documents</h4>
                    <Upload
                      cardId={accommodation._id}
                      url="dashboard/accommodation"
                      handleUpload={handleUpload}
                    />
                  </div>
                  <i>
                    Use this section to store any additional documents you may
                    need for your flights
                  </i>
                  {accommodation.uploads.length &&
                    accommodation.uploads.map((upload, index) => {
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
        );
      })}
    </div>
  );
}
