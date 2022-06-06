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
import ShowHomes from "./routes/ShowHomes";
import ShowUserHomes from "./routes/ShowUserHomes";
import AddHome from "./routes/AddHome";
import AddUserToHome from "./routes/AddUserToHome";
import ShowHomeShoppingLists from "./routes/ShowHomeShoppingLists";
import ShowShoppingList from "./routes/ShowShoppingList";
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
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showBoardHome, setShowBoardHome] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowBoardHome(user.roles.includes("ROLE_ADMIN"));
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
    setShowBoardHome(false);
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElItems, setAnchorElItems] = useState(null);
  const [anchorElHome, setAnchorElHome] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenItemsMenu = (event) => {
    setAnchorElItems(event.currentTarget);
  };
  const handleOpenHomeMenu = (event) => {
    setAnchorElHome(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseItemsMenu = () => {
    setAnchorElItems(null);
  };
  const handleCloseHomeMenu = () => {
    setAnchorElHome(null);
  };
  return (
    <ThemeProvider theme={appStyles}>
      <div>
        <ThemeProvider theme={appBarStyles}>
          <AppBar position="sticky">
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
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography>
                            <div className="link">
                              <Link to={"/items"}>Items</Link>
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
                    {showBoardHome && (
                      <MenuItem onClick={handleCloseHomeMenu}>
                        <Typography>
                          <div className="link">
                            <Link to={"/boardhome"}>Home Board</Link>
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
                    sx={{ my: 2, color: "white", display: "inline-block" }}
                  >
                    <Typography>
                      <div className="link">
                        <Link to={"/home"}>Home</Link>
                      </div>
                    </Typography>
                  </Button>

                  {currentUser ? (
                    <>
                      <div>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            color: "white",
                            display: "inline-block",
                          }}
                        >
                          <Typography>
                            <div className="link">
                              <Link to={"/profile"}>
                                {currentUser.username}
                              </Link>
                            </div>
                          </Typography>
                        </Button>

                        <Button
                          onClick={handleOpenItemsMenu}
                          sx={{
                            my: 2,
                            color: "white",
                            display: "inline-block",
                          }}
                        >
                          <Typography>
                            <div className="link">Items</div>
                          </Typography>
                        </Button>
                        <Button
                          onClick={handleOpenHomeMenu}
                          sx={{
                            my: 2,
                            color: "white",
                            display: "inline-block",
                          }}
                        >
                          <Typography>
                            <div className="link">Homes</div>
                          </Typography>
                        </Button>
                      </div>
                      <Box sx={{ flexGrow: 0 }}>
                        <Menu
                          sx={{ mt: "45px" }}
                          id="menu-appbar"
                          anchorEl={anchorElItems}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElItems)}
                          onClose={handleCloseItemsMenu}
                        >
                          <>
                            <MenuItem>
                              <Button
                                onClick={handleCloseItemsMenu}
                                sx={{
                                  my: 2,
                                  color: "white",
                                  display: "inline-block",
                                }}
                              >
                                <Typography>
                                  <div className="link">
                                    <Link to={"/additem"}>Add Item</Link>
                                  </div>
                                </Typography>
                              </Button>
                            </MenuItem>
                            <MenuItem>
                              <Button
                                onClick={handleCloseItemsMenu}
                                sx={{
                                  my: 2,
                                  color: "white",
                                  display: "inline-block",
                                }}
                              >
                                <Typography>
                                  <div className="link">
                                    <Link to={"/items"}>View Items</Link>
                                  </div>
                                </Typography>
                              </Button>
                            </MenuItem>
                          </>
                        </Menu>
                      </Box>
                      <Box sx={{ flexGrow: 0 }}>
                        <Menu
                          sx={{ mt: "45px" }}
                          id="menu-appbar"
                          anchorEl={anchorElHome}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElHome)}
                          onClose={handleCloseHomeMenu}
                        >
                          <>
                            <MenuItem>
                              <Button
                                onClick={handleCloseHomeMenu}
                                sx={{
                                  my: 2,
                                  color: "white",
                                  display: "inline-block",
                                }}
                              >
                                <Typography>
                                  <div className="link">
                                    <Link to={"/showallhomes"}>
                                      Show All Homes
                                    </Link>
                                  </div>
                                </Typography>
                              </Button>
                            </MenuItem>
                            <MenuItem>
                              <Button
                                onClick={handleCloseHomeMenu}
                                sx={{
                                  my: 2,
                                  color: "white",
                                  display: "inline-block",
                                }}
                              >
                                <Typography>
                                  <div className="link">
                                    <Link
                                      to={`/userhomes/${currentUser.username}`}
                                    >
                                      Show User Homes
                                    </Link>
                                  </div>
                                </Typography>
                              </Button>
                            </MenuItem>
                            <MenuItem>
                              <Button
                                onClick={handleCloseHomeMenu}
                                sx={{
                                  my: 2,
                                  color: "white",
                                  display: "inline-block",
                                }}
                              >
                                <Typography>
                                  <div className="link">
                                    <Link to={"/addhome"}>Add a Home</Link>
                                  </div>
                                </Typography>
                              </Button>
                            </MenuItem>
                            <MenuItem>
                              <Button
                                onClick={handleCloseHomeMenu}
                                sx={{
                                  my: 2,
                                  color: "white",
                                  display: "inline-block",
                                }}
                              >
                                <Typography>
                                  <div className="link">
                                    <Link to={"/addusertohome"}>
                                      Add a User to a Home
                                    </Link>
                                  </div>
                                </Typography>
                              </Button>
                            </MenuItem>
                          </>
                        </Menu>
                      </Box>
                    </>
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
                    {currentUser ? (
                      <MenuItem>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            color: "white",
                            display: "inline-block",
                          }}
                        >
                          <Typography>
                            <div className="link">
                              <a href="/login" onClick={logOut}>
                                LogOut
                              </a>
                            </div>
                          </Typography>
                        </Button>
                      </MenuItem>
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
            <Route path="/showallhomes" element={<ShowHomes />} />
            <Route path="/addhome" element={<AddHome />} />
            <Route path="/addusertohome" element={<AddUserToHome />} />
            <Route
              path="/shoppinglists/:homename"
              element={<ShowHomeShoppingLists />}
            />
            <Route path="/shoppinglist/:id" element={<ShowShoppingList />} />

            <Route path="/userhomes/:username" element={<ShowUserHomes />} />
            <Route path="/additem" element={<AddItem />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/items/:id" element={<Item />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default App;
