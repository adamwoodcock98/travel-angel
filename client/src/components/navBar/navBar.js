import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';


// const NavBar = () => {
  export default function NavBar(){

  return (
    <div className='navbar'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position='static' 
          sx={{ backgroundColor: "#F3B19A" }}
        >

        <Toolbar>
          
            <Typography
              aria-label="logo"
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              TRAVEL ANGEL
            </Typography>
         

          <Grid container justifyContent='flex-end'>
 
              <Button 
                aria-label="dashboard"
                style={{ flex: 1 }} 
                color='inherit'
                sx={{ mt: '12px' }}
                >
                Dashboard
              </Button>
     
    
          <Box sx={{ flexGrow: 0 }}>
 
            <Tooltip title="Open user menu">
               <IconButton sx={{ p: 0 }}>
                  <Avatar src="/static/images/avatar/2.jpg" />
                </IconButton>
             </Tooltip>
      
             <Menu
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
                <Typography textAlign="center">Logout</Typography>
              </IconButton>
            </MenuItem>
            </Menu>
          </Box>
          </Grid>

        </Toolbar>
      </AppBar>
      </Box>
    </div>
  )
}