import React, { useState, useEffect } from "react";
import NavBar from "./navBar/navBar";
import VerticalTabs from "./dashboard/dashboard";
import { Authentication } from "./authentication/authentication";
import { getMap } from "../api/index"

const App = () => {

  // const [map, setMap] = useState([]);

  // useEffect(() => {
  //   getMap()
  //   .then((data) => {
  //     console.log(data);
  //       setMap(data);
  //     })
  // }, []);

  const [session, setSession] = useState(
    window.localStorage.getItem("session")
  );

  console.log(session);

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

  return (
    <div>
      <NavBar handleLogOut={handleLogOut} session={session} />
      <VerticalTabs session={session} />
      <Authentication handleLogIn={handleLogIn} />
      
    </div>
  );
};

export default App;
