import React from 'react';
import PropTypes from 'prop-types'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FlightTakeoffOutlined from '@mui/icons-material/FlightTakeoffOutlined';
import HotelIcon from "@mui/icons-material/HotelOutlined";
import "./dashboard.css";


function TabPanel(props) { //Tab panel is a specific tab on the tab bar, not the tab bar itself.
  const { children, value, index, ...other } = props; //object destructuring - defining props, also ready to be 'typed'. Value of a tab must be the index if no other value passed in.

  return ( // React code to be rendered
    <div
      role="tabpanel" // Gives context to the reader of what an item *should* be viewed as, for example a href may be used a button, so it's role would be 'button'. Also gives context for browser accessibility features like screenreaders.
      hidden={value !== index} // Hide the tab bar if not passed a value
      id={`vertical-tabpanel-${index}`} // Creating a unique ID
      aria-labelledby={`vertical-tab-${index}`} // Aria labelled by gives a name for accessibility features, from elements where the name isn't inferred from its type (a button gets its ARIA name from the <button>text between the tags</button>)
      {...other} // Spreader for if you want to pass in more html tags
    >
      {value === index && ( // if the value is equal to the index, do the stuff after && (JSX if statement)
        <Box sx={{ p: 3 }}> {/*the sx prop allows you to provide supplementary CSS on top of the css already defined, in this case using p: 3 to set the padding*/}
          <Typography>{children}</Typography> {/*children is a typography prop of type node (meaning any renderable type) and refers to the content of the component, so applying typography to whatever content is in the tab item*/}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = { //proptypes are a way of setting what data type the props should be. Defining types as mentioned in the array destructuring.
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) { // a11y props brings accessibility support to React components, this function component takes an index, and returns some data to the object its called on
  return {
    id: `vertical-tab-${index}`, // gives the browser accessibility feature a unique ID to reference 
    'aria-controls': `vertical-tabpanel-${index}`, // aria controls tells accessibility features which other element this specific UI feature is controlling, here it's used to tell a tab bar icon which tab bar component its using
  };
}

export default function VerticalTabs() { // the main functional component to be rendered by index aka the sidebar
  const [value, setValue] = React.useState(0); // setting up state for the tab bar, this is purely to render things for the tab bar, not state that we will ever get data from

  const handleChange = (event, newValue) => { // handling the tab bars changes, in terms of highlighting different icons, rendering the tab contents etc. we don't need to change this.
    setValue(newValue);
  };

  return (
    <Box className="tab-box"
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        className="sidebar"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        indicatorColor="secondary"
        textColor="secondary"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab icon={<FlightTakeoffOutlined />} aria-label="plane" {...a11yProps(0)} /> {/* ... is spreading out all key-value pairs (the id and aria controls from the a11yProps function component*/}
        <Tab icon={<HotelIcon />} aria-label="hotel" {...a11yProps(1)} />
      </Tabs>
      <TabPanel className="tab-content" value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel className="tab-content"value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}
