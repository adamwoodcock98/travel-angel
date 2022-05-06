import React from "react";
import "./flightCard.css"

export const AirportPane = (props) => {

  const data = props.data;

  return(
    <>
      <div className="airport-pane-top">
        <div className="airport-pane-code">
          <h1>{data.airport}</h1>
        </div>
        <div className="airport-pane-city">
          <h2>{data.city}</h2>
        </div>
      </div>
      <div className="airport-pane-middle">
        <h4>Terminal: {data.terminal} | Gate {data.gate}</h4>
      </div>
      <div className="airport-pane-bottom">
        {data.isDeparture && <h4>Scheduled departure</h4>}
        {!data.isDeparture && <h4>Scheduled arrival</h4>}
        <h3>{data.time}</h3>
      </div>
    </>
  )

};