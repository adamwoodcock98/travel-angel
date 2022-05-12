import React, { useState, useEffect } from "react";
import { Alerts } from "./snackbar";

const TipBar = () => {

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const alertPosition = {
    vertical: "top",
    horizontal: "center",
  };

  const handleAlert = (message, type) => {
    setAlertOpen(true);
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const tips = [
    "TIP: Save time adding flights by looking up your flight number",
    "TIP: Know you'll need your documents in a hurry? Upload them to the relevant booking",
    "TIP: Worried you'll lose your passport? You can save the information in your account",
    "TIP: Multiple legs on your journey? No worries, add as many bookings as you need",
    "TIP: Are you a serial holidayer? You can save booking information for all your upcoming trips "
  ];

  let randomTip = tips[Math.floor(Math.random() * tips.length)];

  useEffect(() => {
    handleAlert(randomTip, "success")
  }, [])

  return(
    <Alerts
      message={alertMessage}
      open={alertOpen}
      handleClose={handleAlertClose}
      alertPosition={alertPosition}
      alertType={alertType}
      />
  )

}

export default TipBar;