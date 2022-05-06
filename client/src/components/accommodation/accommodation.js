import axios from "axios";
import React, { useState, useEffect } from "react";
import AccommodationCard from "./accommodationCard";
import AddAccommodation from "./addAccommodation";

export const ViewAccommodation = () => {
  const [accommodation, setAccommodation] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard/accommodation").then((res) => {
      setAccommodation(res.data);
    });
  }, []);

  if (accommodation.length) {
    return (
      <div>
        <AccommodationCard accommodation={accommodation} />
      </div>
    );
  } else {
    return <p>Loading..</p>;
  }
};
