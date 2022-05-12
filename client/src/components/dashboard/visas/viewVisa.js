import React from "react";
import moment from "moment";
import "./viewVisa.css";
import Upload from "../../upload/upload";
import CrudMenu from "./crud/crud";
import Button from '@mui/material/Button';
import "../../assets/styling/cards.css";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function VisaCard({ visa, handleUpload, userId, tripId, refresh }) {
  const formatDate = (date) => moment(date).format("dddd, MMMM Do YYYY");

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/visas/download/${id}`);
  };

  return (
      <div className="card-container">
        {visa.map((visa, index) => {
          return (
            <div className="card" key={index}>
              <div className="header">
                  <h4>Your entry visa to:</h4>
                <div className="crud-menu">
                  <CrudMenu visaData={visa} visaId={visa._id} userId={userId} tripId={tripId} refresh={refresh} />
                </div>
              </div>

                <div className="subheading">
                  <h1>{visa.issuingCountry}</h1>
                </div>
             
              <div className="body">
                <div className="subbody-left">
                  <div className="start-date-header">
                    <p>Start Date</p>
                  </div>
                  <div className="start-date-body">
                    <h3>{formatDate(visa.startDate)}</h3>
                  </div>
                </div>
                <div className="subbody-right">
                  <div className="end-date-header">
                    <p>End Date</p>
                  </div>
                  <div className="end-date-body">
                    <h3>{formatDate(visa.endDate)}</h3>
                  </div>
                </div>
              </div>

              <div className="footer">
                <div className="visaNumber">
                  <p>Visa Number:</p> 
                  <h3 className="visa-num">{visa.visaNumber}</h3>
                </div>

                <div className="upload">
                  <div className="uploads">
                    <div style={{display: "flex", alignItems: "center"}} className="documents" >
                      <h4>Documents</h4>
                      <Upload
                        cardId={visa._id}
                        url="dashboard/visas"
                        handleUpload={handleUpload}
                      />
                    </div>
                    <div>
                      <i>Use this section to store any additional documents you may need for your flights</i>
                      {visa.uploads.length &&
                        visa.uploads.map((upload, index) => {
                          return (
                            <div className="document-button">
                              <Button style={{padding: "0%"}} color="primary" onClick={() => handleSubmit(upload._id)} key={index} endIcon={<FileDownloadOutlinedIcon />}>
                                {upload.name}
                              </Button>
                            </div>
                          )})}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )})}
      </div>
  )
}
                          