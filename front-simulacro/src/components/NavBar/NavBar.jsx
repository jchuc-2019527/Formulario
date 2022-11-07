import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import LoginIcon from "@mui/icons-material/Login";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LogoutIcon from "@mui/icons-material/Logout";



function NavBar(props) {
  const navigate = useNavigate();
  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear()
    navigate('/')
  }

  const token = JSON.parse(localStorage.getItem("token"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ backgroundColor: "rgb(18, 18, 18)" }}>
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
            <SchoolIcon />
            <> </>
            <> </>
            RECITAL POÉTICO
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {token ? (
              <>
                <Button sx={{ color: "#fff" }}>
                  <GroupAddIcon />
                  <> </>
                  <Link
                    to="/usuarios"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <> </>
                    Usuarios
                  </Link>
                </Button>
                <Button onClick={logOut} sx={{ color: "#fff" }}>
                  <LogoutIcon />
                  <> </>
                    <> </>
                    LogOut

                </Button>
              </>
            ) : (
              <>
                <Button sx={{ color: "#fff" }}>
                  <HomeIcon />
                  <> </>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <> </>
                    Home
                  </Link>
                </Button>
                <Button sx={{ color: "#fff" }}>
                  <AppRegistrationIcon />
                  <Link
                    to="/inscripcion"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    Inscribirse
                  </Link>
                </Button>
                <Button sx={{ color: "#fff" }}>
                  <LoginIcon />
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    Login
                  </Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;
