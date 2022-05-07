import React, { useState } from "react";
import axios from "axios";
import { Alerts } from "../../assets/snackbar";

export const LogOut = ({ handleLogOut }) => {
  const url = "http://localhost:8000";

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogOut();
    await axios.post(`${url}/user/log-out`).then((res) => {
      handleAlert(res.data.msg, res.data.type);
    });
  };

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  return (
    <div className="LogOut" onClick={handleSubmit}>
      Log Out
      <Alerts
        message={alertMessage}
        open={alertOpen}
        handleClose={handleAlertClose}
        alertPosition={alertPosition}
        alertType={alertType}
      />
    </div>
  );
};
