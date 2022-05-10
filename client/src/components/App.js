import React, { useState, useEffect } from "react";
import NavBar from "./navBar/navBar";
import VerticalTabs from "./dashboard/dashboard";
import Trips from "./trips/trips";
import { Welcome } from "./welcome/welcome"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

  const [session, setSession] = useState(
    window.localStorage.getItem("session")
  );

  const handleLogIn = (user) => {
    window.localStorage.setItem("session", user);
    setSession(user);
  };

  const handleLogOut = () => {
    window.localStorage.setItem("session", null);
    window.location = "/";
    setSession({});
  };

  useEffect(() => {
    window.localStorage.getItem("session", session);
  }, []);

  if (session !== "null") {
    return (
      <Router>
        <NavBar handleLogOut={handleLogOut} session={session} />
        <Routes>
          <Route path="/" element={<Trips session={session} />} />
          <Route path="/:tripId" element={<VerticalTabs session={session} />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <div>
        <NavBar handleLogIn={handleLogIn} />
        <Welcome />
      </div>
    );
  }
};

export default App;
