import React, { useState, useEffect } from "react";
import NavBar from "./navBar/navBar";
import VerticalTabs from "./dashboard/dashboard";
import { Authentication } from "./authentication/authentication";

const App = () => {
  const [session, setSession] = useState(
    window.localStorage.getItem("session")
  );

  const handleLogIn = (user) => {
    setSession(user);
  };

  const handleLogOut = () => {
    setSession({});
  };

  useEffect(() => {
    window.localStorage.setItem("session", session);
  }, [session]);

  return (
    <div>
      <NavBar handleLogOut={handleLogOut} session={session} />
      <VerticalTabs session={session} />
      <Authentication handleLogIn={handleLogIn} />
    </div>
  );
};

export default App;
