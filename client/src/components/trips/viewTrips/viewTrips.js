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
          return (
            <div className="trip-card" key={index}>
              <div className="trip-card-header">
                <h1>{trip.name}</h1>
              </div>
              <div className="body">{formatDate(trip.startDate)}</div>
              <div className="footer">
                {console.log(
                  `The fucking date now ${formatLongDate(
                    new Date(Date.now())
                  )}`,
                  `The stupid trip date for fuck sake ${formatLongDate(
                    trip.startDate
                  )}`
                )}
                {console.log(
                  moment(formatLongDate(new Date(Date.now()))).isBefore(
                    formatLongDate(trip.startDate)
                  )
                )}
                {formatLongDate(new Date(Date.now())) <
                  formatLongDate(trip.startDate) && (
                  <p>
                    {daysRemaining(trip.startDate) <= 0
                      ? "Less than a day remaining"
                      : `Days left until trip: ${
                          daysRemaining(trip.startDate) + 1
                        }`}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ViewTrips;
