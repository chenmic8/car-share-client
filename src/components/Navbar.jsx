import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import Logout from "./Logout";
// import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PlaceIcon from "@mui/icons-material/Place";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navbar = ({ children }) => {
  const { user } = useContext(LoadingContext);
  const { logout } = useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Car Share
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} size="large">
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Events", "Cars", "Family", "Locations"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton href={"/" + text.toLowerCase()}>
                <ListItemIcon>
                  {index === 0 && <EventIcon />}
                  {index === 1 && <DirectionsCarIcon />}
                  {index === 2 && <Diversity3Icon />}
                  {index === 3 && <PlaceIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem key='Profile' disablePadding>
            <ListItemButton href='/profile'>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItemButton>
          </ListItem>
          {user && user.role === "admin" && (
            <ListItem key='Data' disablePadding>
              <ListItemButton href='/data'>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Data' />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem key='Logout' disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default Navbar;
