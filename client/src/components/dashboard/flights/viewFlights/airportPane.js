import React from "react";
import "./flightCard.css"
import moment from "moment";

export const AirportPane = (props) => {

  const data = props.data;

  const formatDate = (time) => moment(time).format("ddd, D MMM 'YY");

  return(
    <>
      <div className="airport-pane-top">
        <div className="airport-pane-code">
          <h1 class="code">{data.airport}</h1>
        </div>
        <div className="airport-pane-city">
          <h4>{data.city} | {formatDate(data.date)}</h4>
        </div>
      </div>
      <div className="airport-pane-middle">
        <div className="label light-label">
          {data.isDeparture && <p>Departs</p>}
          {!data.isDeparture && <p>Arrives</p>}
        </div>
        <div className="label light-label">
          <p>Terminal</p>
        </div>
        <div className="label light-label">
          <p>Gate</p>
        </div>
      </div>
      <div className="airport-pane-middle">
        <div className="label">
          <h3 style={{color: "#F22771"}}>{data.time}</h3>
        </div>
        <div className="label">
          <h3>{data.terminal}</h3>
        </div>
        <div className="label">
          <h3>{data.gate && data.gate}</h3>
          <h3>{!data.gate && "-"}</h3>
        </div>
      </div>

    </>
  )

};