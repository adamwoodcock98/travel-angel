import React from "react";
import "./flightCard.css"
import moment from "moment";

export const AirportPane = (props) => {

  const data = props.data;

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");

  return(
    <>
      <div className="airport-pane-top">
        <div className="airport-pane-code">
          <h1>{data.airport}</h1>
        </div>
        <div className="airport-pane-city">
          <h2>{data.city} | {formatDate(data.date)}</h2>
        </div>
      </div>
      <div className="airport-pane-middle">
        <h4>Terminal: {data.terminal} | Gate {data.gate}</h4>
      </div>
      <div className="airport-pane-bottom">
        {data.isDeparture && <h4>Scheduled departure</h4>}
        {!data.isDeparture && <h4>Scheduled arrival</h4>}
        <h3>{formatDate(data.date)} @ {data.time}</h3>
      </div>
    </>
  )

};