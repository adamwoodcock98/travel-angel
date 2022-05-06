import React, { useState } from "react";
import { LogOut } from "../authentication/logOut/logOut";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Grid,
} from "@mui/material";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#f22771" }}>
          <Toolbar>
            <div>
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
            </div>

            <Grid container justifyContent="flex-end">
              <div>
                <Button
                  className="dashboard-btn"
                  aria-label="dashboard-btn"
                  style={{ flex: 1 }}
                  color="inherit"
                  sx={{ mt: "4px", mx: 3 }}
                >
                  Dashboard
                </Button>
              </div>
              <div>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open user menu">
                    <IconButton
                      className="avatar"
                      sx={{ p: 0 }}
                      onClick={handleOpenMenu}
                    >
                      <Avatar src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>

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
                        <Typography textAlign="center">Account</Typography>
                      </IconButton>
                    </MenuItem>

                    <MenuItem>
                      <IconButton>
                        <Typography textAlign="center">Settings</Typography>
                      </IconButton>
                    </MenuItem>

                    <MenuItem>
                      <IconButton>
                        <Typography textAlign="center"><LogOut /></Typography>
                      </IconButton>
                    </MenuItem>
                  </Menu>
                </Box>
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
