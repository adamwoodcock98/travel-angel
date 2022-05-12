import React, { useState } from "react";
import { LogOut } from "../authentication/logOut/logOut";
import { Profile } from "./profile/profile";
import { Settings } from "./profile/settings";
import { Authentication } from "../authentication/authentication";
import { Passport } from "./passport/passport";
import { NavUser } from "./navUser/navUser.js";
import "./navBar.css";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";

export default function NavBar({ handleLogOut, handleLogIn, session }) {
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id="navbar" sx={{ backgroundColor: "#f22771" }}>
          <Toolbar>
            <div>
              <a href="/">
                <Typography
                  id="logo"
                  aria-label="logo"
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  Travel Angel
                </Typography>
              </a>
            </div>

            <Grid container justifyContent="flex-end">
              <div>
                {!session && <Authentication handleLogIn={handleLogIn} />}
              </div>
              {session && (
                <div>
                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton
                      className="avatar"
                      sx={{ p: 0 }}
                      onClick={handleOpenMenu}
                    >
                      <Typography textAlign="center">
                        <NavUser session={session} />
                      </Typography>
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
                            <Typography textAlign="center">Trips</Typography>
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
