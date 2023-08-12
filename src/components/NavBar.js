import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useNavigation } from "react-router-dom";
import useWindowSize from '@rooks/use-window-size';
import "./navbar.css"

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


function NavBar(props) {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 1 }}>
        USDT Exchange
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={()=>{
            }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    {innerWidth<600?
      <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav" style={{backgroundColor:'white'}}>
        <Toolbar>
          <IconButton
          style={{backgroundColor:'white'}}
            color="white"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' } }}
            >
            <MenuIcon />

            <p style={{color:'black',position:'absolute',marginLeft:'80vw',fontSize:15,fontFamily:"serif"}}>USDT Exchange</p>

          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
            USDT Exchange
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff',margin:1 }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
              </Box>
    </Box>
  : 
  <div style={{width:'100vw'}}>
  <nav id="navbar" class="">
<div class="nav-wrapper">
  <div class="logo">
    <a href="#home" style={{fontFamily:"serif"}}><i class="fas fa-chess-knight"></i> USDT Exchange</a>
  </div>

  <ul id="menu">
    <li><a href="/welcome">Home</a></li>
 <li><a href="#services">Services</a></li>
 <li><a href="#about">About</a></li>
 <li><a href="#contact">Contact</a></li>
  </ul>
</div>
</nav>



<div class="menuIcon">
<span class="icon icon-bars"></span>
<span class="icon icon-bars overlay"></span>
</div>


<div class="overlay-menu">
<ul id="menu">
    <li><a href="#home">Home</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</div>
</div>

}
</>
    );
  }
  
  
  
  export default NavBar;
/**
 import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import "./navbar.css"

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 1 }}>
        USDT Exchange
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={()=>{
            }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

 

  return (
    <div style={{width:'100vw'}}>
    <nav id="navbar" class="">
  <div class="nav-wrapper">
    <div class="logo">
      <a href="#home"><i class="fas fa-chess-knight"></i> Logo</a>
    </div>

    <ul id="menu">
      <li><a href="#home">Home</a></li>
   <li><a href="#services">Services</a></li>
   <li><a href="#about">About</a></li>
   <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>



<div class="menuIcon">
  <span class="icon icon-bars"></span>
  <span class="icon icon-bars overlay"></span>
</div>


<div class="overlay-menu">
  <ul id="menu">
      <li><a href="#home">Home</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
</div>
</div>
  );
}



export default NavBar; 
 
 */