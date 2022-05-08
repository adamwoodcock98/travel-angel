import React from "react";
import "./testCard.css"

const TestCard = (props) => {
  const testData = props.testData;

  console.log("card", testData)

  return(
    <div className="test-card">
      <div className="test-card-header">
        <h1>{testData.testType} {testData.entryType}</h1>
      </div>  
      <div className="test-card-primary-content">
        <div className="test-card-primary-left">
          <h3>Result</h3>
          <p>{testData.result}</p>
        </div>
        <div className="test-card-primary-right">
          <h3>Test date</h3>
          <p>{testData.testDate}</p>
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
          <p>{testData.validToDate}</p>
        </div>
      </div>
    </div>
  )
}

export default TestCard;