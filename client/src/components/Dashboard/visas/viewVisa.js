import React from 'react';
import moment from 'moment';

export default function VisaCard({ visa }) {

  const formatDate = (date) => moment(date).format("dddd, MMMM Do YYYY");

  return (
      <div className="card-container">
        {visa.map((visa, index) => {
          return (
            <div className="visa-card" key={index}>
              <div className="header">
                <h3>Your entry visa to</h3>
                  <div className="country">
                    <h1>{visa.issuingCountry}</h1>
                  </div>
              </div>
              <div className="body">
                <div className="start-date">
                  <div className="start-date-header">
                    <h3>Start Date</h3>
                  </div>
                  <div className="start-date-body">
                    <p>{formatDate(visa.startDate)}</p>
                  </div>
                </div>
                <div className="end-datet">
                  <div className="end-date-header">
                    <h3>End Date</h3>
                  </div>
                  <div className="end-date-body">
                    <p>{formatDate(visa.endDate)}</p>
                  </div>
                </div>
              </div>
              <div className="footer">
                <div className="visaNumber">
                  <p>{visa.visaNumber}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  