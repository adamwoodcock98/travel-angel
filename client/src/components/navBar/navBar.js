import React, { useState, useEffect } from "react";
import { LogOut } from "../authentication/logOut/logOut";
import { Profile } from "./profile/profile";
import { Settings } from "./profile/settings";
import { Authentication } from "../authentication/authentication";
import { Passport } from "./passport/passport";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
  Grid,
} from "@mui/material";
import axios from "axios";
import "./navBar.css"

export default function NavBar({ handleLogOut, handleLogIn, session }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const getUser = () => {
    axios.get(`http://localhost:8000/user/${session}/profile`).then((res) => {
      setUser(res.data.user);
    });
  };

  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#f22771" }}>
          <Toolbar>
            <div>
              <a href="/">
                <Typography
                  className="logo"
                  aria-label="logo"
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  TRAVEL ANGEL
                </Typography>
              </a>
            </div>

            <Grid container justifyContent="flex-end">
              <div>
                {session && (
                  <Typography
                    id="nav-user"
                    aria-label="nav-user"
                    style={{ flex: 1 }}
                    color="inherit"
                    sx={{ mt: "4px", mx: 3 }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                )}
                {!session && <Authentication handleLogIn={handleLogIn} />}
              </div>
              {session && (
                <div>
                  {getUser()}
                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton
                      className="avatar"
                      sx={{ p: 0 }}
                      onClick={handleOpenMenu}
                    >
                      <Avatar src={user.profilePicture} />
                    </IconButton>

                    <Menu
                      open={open}
                      onClose={handleCloseMenu}
                      className="menu-dropdown"
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >

                      <MenuItem>
                        <IconButton>
                        <a href="/" id="nav-trips">
                          <Typography textAlign="center">
                            Trips
                          </Typography>
                          </a>
                        </IconButton>
                      </MenuItem>

                      <MenuItem>
                        <IconButton>
                          <Typography textAlign="center">
                            <Passport session={session} />
                          </Typography>
                        </IconButton>
                      </MenuItem>

                      <MenuItem>
                        <IconButton>
                          <Typography textAlign="center">
                            <Profile session={session} />
                          </Typography>
                        </IconButton>
                      </MenuItem>

                      <MenuItem>
                        <IconButton>
                          <Typography textAlign="center">
                            <Settings session={session} />
                          </Typography>
                        </IconButton>
                      </MenuItem>

                      <MenuItem>
                        <IconButton>
                          <Typography textAlign="center">
                            <LogOut handleLogOut={handleLogOut} />
                          </Typography>
                        </IconButton>
                      </MenuItem>
                    </Menu>
                  </Box>
                </div>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
