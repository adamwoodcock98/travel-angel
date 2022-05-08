import React, { useState } from "react";

import moment from "moment";
import Button from '@mui/material/Button';
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AddVaccine from "./newVaccine";

const VaccineCard = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (time) => moment(time).format("ddd, D MMM YYYY");

  return(
    <div className="vaccine-card">
      <div className="vaccine-card-header">

      </div>
      <div className="vaccine-card-status-content">

      </div>
      <div className="vaccine-card-dose-content">
        <div className="vaccine-card-dose">

        </div>
        <div className="vaccine-card-dose-date">

        </div>
        <div className="vaccine-card-dose-type">

        </div>
      </div>
      <div className="vaccine-card-proof-content">

      </div>
      <div className="vaccine-card-documents-content">

      </div>
    </div>
  )
}

export default VaccineCard;