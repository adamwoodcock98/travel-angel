import React, { useState, useEffect } from "react";
import axios from "axios";
import "../navBar.css";
import {
  Avatar,
} from "@mui/material";

export const NavUser = ({session}) => {

  const [user, setUser] = useState({});
  const getUser = () => {
    axios.get(`http://localhost:8000/user/${session}/profile`).then((res) => {
      setUser(res.data.user);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (user) {
    return (
      <div>
        <div id="nav-user-name">{user.firstName} {user.lastName}</div>
        <Avatar id="nav-avatar" src={user.profilePicture} />
      </div>
    )}
};

export default NavUser;