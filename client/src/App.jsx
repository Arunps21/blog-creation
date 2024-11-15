import * as React from "react";
import PropTypes from "prop-types";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomePage from "./blog/HomePage";
import UserLogin from "./user/UserLogin";
import UserReg from "./user/UserReg";
import UserHome from "./user/UserHome";
import AddBlog from "./blog/AddBlog";

const drawerWidth = 240;

const navItems = [
  { name: "Home", path: "/" },
  { name: "AddBlog", path: "/addBlog" },
  { name: "Profile", path: "/userHome" },
  { name: "Logout" },
];

const guestNavItems = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/userLogin" },
];

function UserNav(props) {
  const navigate = useNavigate()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/userLogin")
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blog Creation
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) =>
          item.name === "Logout" ? (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Blog Creation
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) =>
              item.name === "Logout" ? (
                <Button
                  key={item.name}
                  onClick={handleLogout}
                  sx={{ color: "#fff" }}
                >
                  {item.name}
                </Button>
              ) : (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{ color: "#fff" }}
                >
                  {item.name}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

function NavbarPage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blog Creation
      </Typography>
      <Divider />
      <List>
        {guestNavItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Blog Creation
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {guestNavItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{ color: "#fff" }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

NavbarPage.propTypes = {
  window: PropTypes.func,
};
UserNav.propTypes = {
  window: PropTypes.func,
};

export default function App() {
  const isLoggedIn = localStorage.getItem("userId");

  return (
    <>
      {isLoggedIn ? <UserNav /> : <NavbarPage />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userReg" element={<UserReg />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/addBlog" element={<AddBlog />} />
      </Routes>
    </>
  );
}
