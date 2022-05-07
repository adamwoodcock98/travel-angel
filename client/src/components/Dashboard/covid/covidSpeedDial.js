import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import AddVaccine from "./vaccinations/newVaccine"

const handleReminderClick = (e) => {
  console.log("clicked on reminder");
  return(
    <AddVaccine />
  );
};

const handleTestClick = (e) => {
  console.log("clicked on test");
};

const handleVaccineClick = (e) => {
  console.log("clicked on vaccine");
};

const actions = [
  {
    icon: <NotificationAddOutlinedIcon />,
    name: "Reminder",
    action: handleReminderClick,
  },
  { icon: <BiotechOutlinedIcon />, name: "Test", action: handleTestClick },
  {
    icon: <VaccinesOutlinedIcon />,
    name: "Vaccination",
    action: handleVaccineClick,
  },
];

export default function PlaygroundSpeedDial() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <AddVaccine />;
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <Box sx={{ position: "relative", mt: 3, height: 320 }}>
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          FabProps={{
            sx: {
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "secondary.main",
              },
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipOpen
              tooltipTitle={action.name}
              onClick={() => {handleClose(); action.action();}}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
    </>
  );
}
