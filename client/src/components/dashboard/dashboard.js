import React from "react";
import PropTypes from "prop-types";
// import theme from "../assets/theme";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import {
  FlightTakeoff,
  Hotel,
  Commute,
  LocalParkingRounded,
  VpnLockOutlined,
  CoronavirusOutlined,
} from "@mui/icons-material";
import "./dashboard.css";
import { ViewAccommodation } from "./accommodation/accommodation";
import Transfers from "./transfers/transfers";
import Flights from "./flights/flights";
import Parking from "./parking/parking";
import Covid from "./covid/covid";
import Visa from "./visas/visas";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ session }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box
      className="tab-box"
      sx={{ flexGrow: 1, bgcolor: "background.paper" }}
    >
      <Tabs
        className="sidebar"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        indicatorColor="primary"
        textColor="primary"
        id="side-bar"
      >
        <Tab icon={<FlightTakeoff />} aria-label="plane" {...a11yProps(0)} />
        <Tab icon={<Hotel />} aria-label="hotel" {...a11yProps(1)} />
        <Tab icon={<Commute />} aria-label="transfer" {...a11yProps(2)} />
        <Tab
          icon={<LocalParkingRounded />}
          aria-label="parking"
          {...a11yProps(3)}
        />
        <Tab icon={<VpnLockOutlined />} aria-label="visa" {...a11yProps(4)} />
        <Tab
          icon={<CoronavirusOutlined />}
          aria-label="covid"
          {...a11yProps(5)}
        />
      </Tabs>
     
      <TabPanel className="tab-content" value={value} index={0}>
        <Flights session={session} />
      </TabPanel>
      <TabPanel className="tab-content" value={value} index={1}>
        <ViewAccommodation session={session} />
      </TabPanel>
      <TabPanel className="tab-content" value={value} index={2}>
        <Transfers session={session} />
      </TabPanel>
      <TabPanel className="tab-content" value={value} index={3}>
        <Parking session={session} />
      </TabPanel>
      <TabPanel className="tab-content" value={value} index={4}>
        <Visa session={session} />
      </TabPanel>
      <TabPanel className="tab-content" value={value} index={5}>
        <Covid session={session} />
      </TabPanel>
    </Box>
  );
}
