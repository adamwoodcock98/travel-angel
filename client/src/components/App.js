import React, { useState } from "react";
import NavBar from "./navBar/navBar";
import VerticalTabs from "./dashboard/dashboard";
import { Authentication } from "./authentication/authentication";

const App = () => {
  const [session, setSession] = useState({});

  const handleLogIn = (user) => {
    setSession(user);
  };

  const handleLogOut = () => {
    setSession(null);
  };

  return (
    <div>
      <NavBar handleLogOut={handleLogOut} />
      <VerticalTabs />
      <Authentication handleLogIn={handleLogIn} />
    </div>
  );
};

export default App;
