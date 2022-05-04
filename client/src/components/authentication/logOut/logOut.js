import React, { useState } from "react";
import axios from "axios";
import { Alert } from "../../assets/snackbar";

export const LogOut = () => {
  const url = "http://localhost:8000";

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSubmitLogOut = async (e) => {
    e.preventDefault();

    await axios.post(`${url}/user/log-out`).then((res) => {
      handleAlert(res.data.msg);
    });
  };

  const handleAlert = (message) => {
    setAlertOpen(true);
    setAlertMessage(message);
  };

  return (
    <div className="LogOut" onClick={handleSubmitLogOut}>
      Log Out
      <Alert
        message={alertMessage}
        open={alertOpen}
        handleClose={handleAlertClose}
        alertPosition={alertPosition}
      />
    </div>
  );
};
