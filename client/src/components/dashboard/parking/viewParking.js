import React from "react";
import "./viewParking.css";
import moment from "moment";
import Upload from "../../upload/upload";

const ParkingCard = (props) => {
  const parkingData = props.bookingData;

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/accommodation/download/${id}`);
  };

  return (
    <div className="parking-card">
      <div className="parking-card-header">
        <h1>
          Your booking
          {parkingData.bookingReference && `: ${parkingData.bookingReference}`}
        </h1>
      </div>
      <div className="parking-card-dates-content">
        <div className="parking-card-dates-arrival">
          <h3>From</h3>
          <h2>{parkingData.startDate && formatDate(parkingData.startDate)}</h2>
        </div>
        <div className="parking-card-dates-departure">
          <h3>Until</h3>
          <h2>{parkingData.endDate && formatDate(parkingData.endDate)}</h2>
        </div>
      </div>
      <div className="parking-card-contact-content">
        <div className="parking-card-contact-airport">
          <h2>{parkingData.airport}</h2>
        </div>
        <div className="parking-card-contact-name">
          <h3>
            {parkingData.type} {parkingData.company}
          </h3>
        </div>
        <div className="parking-card-contact-address">
          <p>
            {parkingData.address.buildingNumber}{" "}
            {parkingData.address.buildingName},{" "}
            {parkingData.address.addressLine1}, {parkingData.address.postalCode}
          </p>
        </div>
        <div className="parking-card-contact-number">
          <h4>Tel: {parkingData.contactNumber}</h4>
        </div>
      </div>
      <div className="parking-card-vehicle-content">
        <h2>For your vehicle: {parkingData.regPlate}</h2>
      </div>
      <div className="parking-card-notes-footer">
        <h3>Notes</h3>
        <p>{parkingData.notes}</p>
      </div>
      <div className="uploads">
        <Upload cardId={parkingData._id} url="dashboard/parking" />
        {parkingData.uploads.length &&
          parkingData.uploads.map((upload, index) => {
            return (
              <button onClick={() => handleSubmit(upload._id)} key={index}>
                {upload.name}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default ParkingCard;
