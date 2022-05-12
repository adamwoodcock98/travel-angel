import React, { useState } from "react";
import "./testCard.css";
import moment from "moment";
import Button from "@mui/material/Button";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import AddTest from "./newTest";
import CrudMenu from "./crud/crud";
import Upload from "../../../upload/upload";
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
          {testData.testType} {testData.entryType}
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
            <h3>Result</h3>
            <p>{testData.result}</p>
          </div>
          <div className="test-card-primary-right">
            <h3>Test date</h3>
            <p>{formatDate(testData.testDate)}</p>
          </div>
        </div>
        <div className="test-card-secondary-content">
          <div className="test-card-secondary-left">
            <h3>Test number</h3>
            <p>{testData.testNumber}</p>
          </div>
          <div className="test-card-secondary-right">
            <h3>Test country</h3>
            <p>{testData.testCountry}</p>
          </div>
        </div>
        <div className="test-card-tertiary-content">
          <div className="test-card-tertiary-left">
            <h3>Test provider</h3>
            <p>{testData.testProvider}</p>
          </div>
          <div className="test-card-tertiary-right">
            <h3>Valid until</h3>
            <p>{formatDate(testData.validToDate)}</p>
          </div>
        </div>
      </div>
      <div style={{ display: testData.entryType === "Reminder" ? "" : "none" }}>
        <div className="test-card-primary-content">
          <div className="test-card-primary-left">
            <h3>Test from</h3>
            <p>{formatDate(testData.testFromDate)}</p>
          </div>
          <div className="test-card-primary-right">
            <h3>Result by</h3>
            <p>{formatDate(testData.resultByDate)}</p>
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
        <Upload
          cardId={testData._id}
          url="dashboard/covid/test"
          handleUpload={handleUpload}
        />
        <div className="uploads">
          Download Your Documents
          {console.log(testData)}
          {testData.uploads.length &&
            testData.uploads.map((upload, index) => {
              return (
                <button onClick={() => handleSubmit(upload._id)} key={index}>
                  {upload.name}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
