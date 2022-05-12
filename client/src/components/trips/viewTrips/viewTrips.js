import React from "react";
import moment from "moment";
import "./viewTrips.css";

const ViewTrips = ({ trips }) => {
  const formatDate = (date) => moment(date).format("MMMM YYYY");
  const formatLongDate = (date) => moment(date).format("L");

  const dateNowVsTrip = (date) =>
    formatLongDate(new Date(Date.now())) < formatLongDate(date);

  const daysRemaining = (date) => {
    const eventdate = moment(date);
    const todaysdate = moment(new Date(Date.now()));
    return eventdate.diff(todaysdate, "days");
  };
  if (trips) {
    return (
      <div className="trip-card-container">
        {trips.map((trip, index) => {
          const url = `/${trip._id}`;
          return (
            <div className="trip-card" key={index}>
              <a href={url}>
                <div className="trip-card-header">
                  <h3 className="trip-h3">{trip.name}</h3>
                </div>
                <div className="body"><h4 className="trip-h4">{formatDate(trip.startDate)}</h4></div>
                <div className="footer">
                  {formatLongDate(new Date(Date.now())) <
                    formatLongDate(trip.startDate) && (
                    <p>
                      {daysRemaining(trip.startDate) <= 0
                        ? "Less than a day remaining"
                        : `Days left until the trip: ${
                            daysRemaining(trip.startDate) + 1
                          }`}
                    </p>
                  )}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ViewTrips;
