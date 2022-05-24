import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

//import Footer from "./components/Footer";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

// Route components
import Home from "./routes/Home";
import ItemList from "./routes/ItemList";
import AddItem from "./routes/AddItem";
import Item from "./routes/Item";
import AuthService from "./services/auth.service";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import BoardAdmin from "./routes/BoardAdmin";
import BoardCaregiver from "./routes/BoardCaregiver";
import BoardShopper from "./routes/BoardShopper";
import BoardUser from "./routes/BoardUser";

// Styling Imports
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

const appStyles = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "grey",
          ".link": {
            a: {
              textDecoration: "none",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "black",
              boxShadow: "none",
            },
          },
        },
      },
    },
  },
});

// Navigation Styles
const appBarStyles = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "grey",
          ".link": {
            a: {
              textDecoration: "none",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "black",
              boxShadow: "none",
            },
          },
        },
      },
    },
  },
});

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCaregiverBoard, setShowCaregiverBoard] = useState(false);
  const [showShopperBoard, setShowShopperBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowCaregiverBoard(user.roles.includes("ROLE_CAREGIVER"));
      setShowShopperBoard(user.roles.includes("ROLE_SHOPPER"));
      setShowUserBoard(user.roles.includes("ROLE_USER"));
    }
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setShowAdminBoard(false);
    setShowCaregiverBoard(false);
    setShowShopperBoard(false);
    setShowUserBoard(false);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    <ThemeProvider theme={appStyles}>
      <div>
        <ThemeProvider theme={appBarStyles}>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                >
                  <div className="link">
                    <Link to={"/"}>ShopEZ</Link>
                  </div>
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
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography>
                        <div className="link">
                          <Link to={"/home"}>Home</Link>
                        </div>
                      </Typography>
                    </MenuItem>
                    {currentUser ? (
                      <div>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography>
                            <div className="link">
                              <Link to={"/profile"}>
                                {currentUser.username}
                              </Link>
                            </div>
                          </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography>
                            <div className="link">
                              <a href="/login" onClick={logOut}>
                                LogOut
                              </a>
                            </div>
                          </Typography>
                        </MenuItem>
                      </div>
                    ) : (
                      <div>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography>
                            <div className="link">
                              <Link to={"/login"}>Login</Link>
                            </div>
                          </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography>
                            <div className="link">
                              <Link to={"/register"}>Sign Up</Link>
                            </div>
                          </Typography>
                        </MenuItem>
                      </div>
                    )}

                    {/* Comeback and figure out how to display based off or roles */}

                    {/* <MenuItem onClick={handleCloseNavMenu}>
                      <Typography>
                        <div className="link">
                          <Link to={"/items"}>Items</Link>
                        </div>
                      </Typography>
                    </MenuItem> */}

                    {showAdminBoard && (
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography>
                          <div className="link">
                            <Link to={"/admin"}>Admin Board</Link>
                          </div>
                        </Typography>
                      </MenuItem>
                    )}

                    {showUserBoard && (
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography>
                          <div className="link">
                            <Link to={"/user"}>User Board</Link>
                          </div>
                        </Typography>
                      </MenuItem>
                    )}

                    {showShopperBoard && (
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography>
                          <div className="link">
                            <Link to={"/shopper"}>Shopper Board</Link>
                          </div>
                        </Typography>
                      </MenuItem>
                    )}

                    {showCaregiverBoard && (
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography>
                          <div className="link">
                            <Link to={"/caregiver"}>Caregiver Board</Link>
                          </div>
                        </Typography>
                      </MenuItem>
                    )}
                  </Menu>
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                >
                  <div className="logo-link">
                    <Link to="/">ShopEZ</Link>
                  </div>
                </Typography>

                {/* ---------------------------------------- Navbar component start ---------------------------------------------------- */}

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Typography>
                      <div className="link">
                        <Link to={"/home"}>Home</Link>
                      </div>
                    </Typography>
                  </Button>
                  {currentUser ? (
                    <div>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "inline-block" }}
                      >
                        <Typography>
                          <div className="link">
                            <Link to={"/profile"}>{currentUser.username}</Link>
                          </div>
                        </Typography>
                      </Button>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "incline-block" }}
                      >
                        <Typography>
                          <div className="link">
                            <a href="/login" onClick={logOut}>
                              LogOut
                            </a>
                          </div>
                        </Typography>
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "incline-block" }}
                      >
                        <Typography>
                          <div className="link">
                            <Link to={"/login"}>Login</Link>
                          </div>
                        </Typography>
                      </Button>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "incline-block" }}
                      >
                        <Typography>
                          <div className="link">
                            <Link to={"/register"}>Sign Up</Link>
                          </div>
                        </Typography>
                      </Button>
                    </div>
                  )}
                  {/* 
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Typography>
                      <div className="link">
                        <Link to={"/items"}>Items</Link>
                      </div>
                    </Typography>
                  </Button> */}

                  {showAdminBoard && (
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Typography>
                        <div className="link">
                          <Link to={"/admin"}>Admin Board</Link>
                        </div>
                      </Typography>
                    </Button>
                  )}
                  {showUserBoard && (
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Typography>
                        <div className="link">
                          <Link to={"/user"}>User Board</Link>
                        </div>
                      </Typography>
                    </Button>
                  )}

                  {showShopperBoard && (
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Typography>
                        <div className="link">
                          <Link to={"/shopper"}>Shopper Board</Link>
                        </div>
                      </Typography>
                    </Button>
                  )}
                  {showCaregiverBoard && (
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Typography>
                        <div className="link">
                          <Link to={"/caregiver"}>Caregiver Board</Link>
                        </div>
                      </Typography>
                    </Button>
                  )}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="user-prof" />
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
                    <MenuItem key="setting" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">wow</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </ThemeProvider>
        <div className="routes">
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/home"} element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/caregiver" element={<BoardCaregiver />} />
            <Route path="/shopper" element={<BoardShopper />} />

            <Route path="additem" element={<AddItem />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/items/:id" element={<Item />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default App;
