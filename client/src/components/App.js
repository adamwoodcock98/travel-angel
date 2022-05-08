import React, { useState, useEffect } from "react";
import NavBar from "./navBar/navBar";
import VerticalTabs from "./dashboard/dashboard";
import { Authentication } from "./authentication/authentication";
import Trips from "./trips/trips";

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
    setSession({});
  };

  useEffect(() => {
    window.localStorage.getItem("session", session);
  }, []);

  if (session !== "null") {
    return (
      <div>
        <NavBar handleLogOut={handleLogOut} session={session} />
        <Trips session={session} />
        <VerticalTabs session={session} />
        <Authentication handleLogIn={handleLogIn} />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar handleLogOut={handleLogOut} session={session} />
        <Authentication handleLogIn={handleLogIn} />
      </div>
    );
  }
};

export default App;
