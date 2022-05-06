import React from "react";
import "./viewParking.css";

export const ParkingCard = (props) => {

  const parkingData = props.bookingData;

  return(
    <div className="parking-card">
      <div className="parking-card-header">
      </div>
      <div className="parking-card-dates-content">
        <div className="parking-card-dates-arrival">

        </div>
        <div className="parking-card-dates-departure">

        </div>
      </div>
      <div className="parking-card-contact-content">
        <div className="parking-card-contact-airport">

        </div>
        <div className="parking-card-contact-name">

        </div>
        <div className="parking-card-contact-address">

        </div>
        <div className="parking-card-contact-number">

        </div>
      </div>
      <div className="parking-card-vehicle-content">

      </div>
      <div className="parking-card-notes-footer">

      </div>
    </div>
  )

}