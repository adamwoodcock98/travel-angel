import React, { useState, useEffect } from "react";
import NavBar from "./navBar/navBar";
import VerticalTabs from "./dashboard/dashboard";
import Trips from "./trips/trips";
import { Welcome } from "./welcome/welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material";

const App = () => {
  const [session, setSession] = useState(
    window.localStorage.getItem("session")
  );

  const handleLogIn = (user) => {
    window.localStorage.setItem("session", user);
    setSession(user);
  };

  const handleLogOut = async () => {
    await window.localStorage.setItem("session", null);
    window.location = "/";
    setSession(null);
  };

  useEffect(() => {
    window.localStorage.getItem("session", session);
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: "Roboto-Regular",
    },
    palette: {
      primary: {
        main: '#f22771',
      },
      secondary: {
        main: 'rgb(255, 0, 93)',
      },
      error: {
        main: '#FF3434',
      },
      warning: {
        main: '#eba0ae',
      },
      success: {
        main: '#64baaa',
      },
    },
  });

  if (session !== "null" && session !== null) {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar handleLogOut={handleLogOut} session={session} />
          <Routes>
            <Route path="/" element={<Trips session={session} />} />
            <Route path="/:tripId" element={<VerticalTabs session={session} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <NavBar handleLogIn={handleLogIn} />
          <Welcome />
        </div>
      </ThemeProvider>
    );
  }
};

export default App;
