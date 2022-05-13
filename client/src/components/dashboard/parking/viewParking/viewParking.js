import React from "react";
import "./viewParking.css";
import moment from "moment";
import Upload from "../../../upload/upload";
import CrudMenu from "./crud/crud";
import Button from "@mui/material/Button";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import "../../../assets/styling/cards.css";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const ParkingCard = (props) => {
  const parkingData = props.bookingData;
  const userId = props.userId;
  const tripId = props.tripId;
  const refresh = props.refresh;
  const handleUpload = props.handleUpload;

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");
  const formatTime = (time) => moment(time).format("hh:mm");

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/parking/download/${id}`);
  };

  return (
    <div className="card-container">
      <div className="card">
        
        <div className="header">
          <div className="title">
            <h1>
              Your booking
              {parkingData.bookingReference && `: ${parkingData.bookingReference}`}
            </h1>
            </div>
          <div className="crud-menu">
          <CrudMenu userId={userId} parkingData={parkingData} tripId={tripId} refresh={refresh} />
        </div>
        </div>
        <div className="body">
          <div className="subbody-left">
            <div className="start-date-header">
              <p className="light-label">From</p>
            </div>
            <div className="start-date-body">
              <h3>{parkingData.startDate && formatDate(parkingData.startDate)}</h3>
              <h3 className="fuschia">{parkingData.startDate && formatTime(parkingData.startDate)}</h3>
            </div>
          </div>
          <div className="subbody-right">
            <div className="end-date-header">
              <p className="light-label">Until</p>
            </div>
            <div className="end-date-body">
              <h3>{parkingData.endDate && formatDate(parkingData.endDate)}</h3>
              <h3 className="fuschia">{parkingData.endDate && formatTime(parkingData.endDate)}</h3>
            </div>
          </div>
        </div>

        <div className="contact-content-body">
          <div className="parking-card-vehicle-content">
            <p className="light-label">For your vehicle</p>
            <h3>{parkingData.regPlate}</h3>
          </div>
          <div className="contact-content-airport">
            <h2>{parkingData.airport}</h2>
          </div>
          <div className="contact-content-name">
            <h3>
              {parkingData.type} {parkingData.company}
            </h3>
          </div>
          <div className="contact-content-address">
            <p>
              {parkingData.address.buildingNumber}{" "}
              {parkingData.address.buildingName},{" "}
              {parkingData.address.addressLine1},{" "}
              {parkingData.address.postalCode}
            </p>
          </div>

          <div className="contact-content-number">
            <p className="light-label">Tel:</p> <h4>{parkingData.contactNumber}</h4>
          </div>
          <div className="directions" >
            <Button
              color="secondary"
              startIcon={<DirectionsOutlinedIcon />}
              target="_blank"
              variant="outlined"
              href={props.handleDirections(parkingData.address)}
            >
              Get Directions
            </Button>
          </div>
        </div>
        <div className="footer">
          <h3>Notes</h3>
          <p>{parkingData.notes}</p>
        </div>
        <div className="upload">
          <div className="uploads">
            <div style={{ display: "flex", alignItems: "center" }} className="documents">
              <h4>Documents</h4>
              <Upload
                cardId={parkingData._id}
                url="dashboard/parking"
                handleUpload={handleUpload}
              />
            </div>
            <i>
              Use this section to store any additional documents you may need
              for your flights
            </i>
            {parkingData.uploads.length &&
              parkingData.uploads.map((upload, index) => {
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
};

export default ParkingCard;
