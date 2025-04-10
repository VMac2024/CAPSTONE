import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { currentUser, handleUpdateUser } = useUserContext();
  //const { currentUser, setCurrentUser } = useUserContext();

  // let loggedInUser = null;

  const handleLogout = () => {
    console.log("UserLogoutState:", currentUser);

    handleUpdateUser({}); //loggedInUser

    handleCloseUserMenu();
    navigate("/");

    //setCurrentUser(loggedInUser);
    // {() => handleUpdateUser({} as User)}
    //const { currentUser, handleUpdateUser } = useUserContext();
    console.log("currentUser:", currentUser);
    //console.log("loggedoutUser:", loggedInUser);
    //setTimeout(() => navigate("/"), 3000);
    console.log("user:", currentUser);
    //return;
  };

  const pages = [
    { link: "/", label: "Home" },
    { link: "/posts", label: "Posts" },
    { link: "/articles", label: "Articles" },
    { link: "/projects", label: "Projects" },
    { link: "/about", label: "About" },
  ];
  const settings = [
    { link: "/loginpage", label: "Login" },
    { link: "/dash", label: "Dashboard" },
  ];
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#001c28" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*Navbar Icon */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "#aab7a5",
            }}
          >
            GreenEarth Community Hub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} component={NavLink} to={page.link}>
                  {page.label}

                  <Typography sx={{ textAlign: "center" }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#aab7a5",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.link} component={NavLink} to={page.link} sx={{ my: 2, color: "#aab7a5", display: "block" }}>
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.link} component={NavLink} to={setting.link}>
                  <Typography sx={{ textAlign: "center" }}>{setting.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <Typography
                  sx={{ textAlign: "center" }}
                  onClick={
                    handleLogout

                    //console.log("Test");
                  }
                >
                  {/*<Button onClick={() => handleUpdateUser({} as User)}>Log Out</Button>*/}
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

//{ link: "#", label: "Logout", onClick: { handleLogout } },
