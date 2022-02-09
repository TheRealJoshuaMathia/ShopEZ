import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import ItemList from "./pages/ItemList";
import Login from "./pages/Login";
import Navigation from "./Components/Navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddItem from "./Components/AddItem";

const app = createTheme({
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

function App() {
  return (
    <Router>
      <ThemeProvider theme={app}>
        <div className="app">
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/additem" element={<AddItem />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/items" element={<ItemList />}></Route>
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}
export default App;
