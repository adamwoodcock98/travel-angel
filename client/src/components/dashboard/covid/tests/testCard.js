import React, { useState } from "react";
import "./testCard.css";
import moment from "moment";
import Button from "@mui/material/Button";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import AddTest from "./newTest";
import CrudMenu from "./crud/crud";
import Upload from "../../../upload/upload";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import "../../../assets/styling/cards.css";

const TestCard = (props) => {
  const [open, setOpen] = useState(false);
  const testData = props.testData;
  const userId = props.userId;
  const testId = testData._id;
  const tripId = props.tripId;
  const handleUpload = props.handleUpload;
  const refresh = props.refresh;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");

  const handleSubmit = async (id) => {
    window.open(`http://localhost:8000/dashboard/covid/download/${id}`);
  };

  return (
    <div className="test-card">
      <div className="test-card-header">
        <h1>
          {testData.testType} Test {testData.entryType}
        </h1>
        <div className="crud-menu">
          <CrudMenu
            testData={testData}
            testId={testId}
            userId={userId}
            refresh={refresh}
            tripId={tripId}
            handleUpload={handleUpload}
          />
        </div>
      </div>
      <div style={{ display: testData.entryType === "Result" ? "" : "none" }}>
        <div className="test-card-primary-content">
          <div className="test-card-primary-left">
            <p className="fuschia">Result</p>
            <h4>{testData.result}</h4>
          </div>
          <div className="test-card-primary-right">
            <p className="light-label">Test date</p>
            <h4>{formatDate(testData.testDate)}</h4>
          </div>
        </div>
        <div className="test-card-secondary-content">
          <div className="test-card-secondary-left">
            <p className="light-label">Test number</p>
            <h4>{testData.testNumber}</h4>
          </div>
          <div className="test-card-secondary-right">
            <p className="light-label">Test country</p>
            <h4>{testData.testCountry}</h4>
          </div>
        </div>
        <div className="test-card-tertiary-content">
          <div className="test-card-tertiary-left">
            <p className="light-label">Test provider</p>
            <h4>{testData.testProvider}</h4>
          </div>
          <div className="test-card-tertiary-right">
            <p className="fuschia">Valid until</p>
            <h4>{formatDate(testData.validToDate)}</h4>
          </div>
        </div>
      </div>
      <div style={{ display: testData.entryType === "Reminder" ? "" : "none" }}>
        <div className="test-card-primary-content">
          <div className="test-card-primary-left">
            <p className="light-label">Test from</p>
            <h4>{formatDate(testData.testFromDate)}</h4>
          </div>
          <div className="test-card-primary-right">
            <p className="fuschia">Result by</p>
            <h4>{formatDate(testData.resultByDate)}</h4>
          </div>
        </div>
        <div className="test-card-secondary-content">
          <Button
            color="secondary"
            startIcon={<BiotechOutlinedIcon />}
            onClick={handleOpen}
          >
            Add results
          </Button>
          <AddTest
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            entryType="Result"
            userId={userId}
            testData={testData}
            testID={testData._id}
            tripId={tripId}
            handleUpload={handleUpload}
          />
        </div>
      </div>
      <div className="upload">
        <div className="uploads">
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="documents"
          >
            <h4>Documents</h4>
            <Upload
              cardId={testData._id}
              url="dashboard/covid/test"
              handleUpload={handleUpload}
            />
          </div>
          <i>
            Use this section to store any additional documents you may need for
            your COVID tests
          </i>
          {testData.uploads.length > 0 &&
            testData.uploads.map((upload, index) => {
              return (
                <div className="document-button">
                  <Button
                    style={{ padding: "0%" }}
                    color="primary"
                    onClick={() => handleSubmit(upload._id)}
                    key={index}
                    endIcon={<FileDownloadOutlinedIcon />}
                  >
                    {upload.name}
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
