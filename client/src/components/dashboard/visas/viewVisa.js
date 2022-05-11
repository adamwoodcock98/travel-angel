import React from "react";
import moment from "moment";
import "./viewVisa.css";
import Upload from "../../upload/upload";
import CrudMenu from "./crud/crud";

export default function VisaCard({ visa, handleUpload, userId, tripId, refresh }) {
  const formatDate = (date) => moment(date).format("dddd, MMMM Do YYYY");

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/visas/download/${id}`);
  };

  return (
      <div className="card-container">
        {visa.map((visa, index) => {
          return (
            <div className="visa-card" key={index}>
              <div className="header">
                <h3>Your entry visa to</h3>
                  <CrudMenu visaData={visa} visaId={visa._id} userId={userId} tripId={tripId} refresh={refresh} />
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
                <p>Visa Number: {visa.visaNumber}</p>
              </div>
            </div>
            <div className="uploads">
              <Upload
                cardId={visa._id}
                url="dashboard/visas"
                handleUpload={handleUpload}
              />
              {visa.uploads.length &&
                visa.uploads.map((upload, index) => {
                  return (
                    <button
                      onClick={() => handleSubmit(upload._id)}
                      key={index}
                    >
                      {upload.name}
                    </button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
