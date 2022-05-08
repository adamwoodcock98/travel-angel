import React, { useState } from "react";
import axios from "axios";
import "./testCard.css"

export const TestCard = (props) => {
  const testData = props.testData;

  return(
    <div className="test-card">
      <div className="test-card-header">
        
      </div>  
      <div className="test-card-primary-content">
        <div className="test-card-primary-left">

        </div>
        <div className="test-card-primary-right">

        </div>
      </div>
      <div className="test-card-secondary-content">
        <div className="test-card-secondary-left">
          
        </div>
        <div className="test-card-secondary-right">

        </div>
      </div>
      <div className="test-card-tertiary-content">
        <div className="test-card-tertiary-left">
          
        </div>
        <div className="test-card-tertiary-right">

        </div>
      </div>
    </div>
  )
}