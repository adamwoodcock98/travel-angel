import React from "react";
import "./viewParking.css";
import moment from "moment";
import CrudMenu from "./crud/crud"
import Button from "@mui/material/Button";
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';

const ParkingCard = (props) => {
  const parkingData = props.bookingData;
  const userId = props.userId
  const tripId = props.tripId

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");
  const formatTime = (time) => moment(time).format("hh:mm");

  return(
    <div className="parking-card">
      <div className="parking-card-header">
        <h1>Your booking{parkingData.bookingReference && `: ${parkingData.bookingReference}`}</h1>
        
      </div>
      <div className="parking-card-dates-content">
        <div className="parking-card-dates-arrival">
          <h3>From</h3>
          <h2>{parkingData.startDate && formatDate(parkingData.startDate)}</h2>
          <h2>{parkingData.startDate && formatTime(parkingData.startDate)}</h2>
        </div>
        <div className="parking-card-dates-departure">
          <h3>Until</h3>
          <h2>{parkingData.endDate && formatDate(parkingData.endDate)}</h2>
          <h2>{parkingData.endDate && formatTime(parkingData.endDate)}</h2>
        </div>
      </div>
      <div className="parking-card-contact-content">
        <div className="parking-card-contact-airport">
          <h2>{parkingData.airport}</h2>
        </div>
        <div className="parking-card-contact-name">
          <h3>{parkingData.type} {parkingData.company}</h3>
        </div>
        <div className="parking-card-contact-address">
          <p>{parkingData.address.buildingNumber} {parkingData.address.buildingName}, {parkingData.address.addressLine1}, {parkingData.address.postalCode}</p>
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
      <CrudMenu userId={userId} parkingData={parkingData} tripId={tripId} />
      <div className="directions">
        <Button color="secondary" startIcon={<DirectionsOutlinedIcon />} target="_blank" href={props.handleDirections(parkingData.address)}>Get Directions</Button>
      </div>
    </div>
  )

}

export default ParkingCard