import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./routes/Home";
import ItemList from "./routes/ItemList";
import Login from "./routes/Login";
import Navigation from "./Components/Navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddItem from "./routes/AddItem";
import Item from "./routes/Item";

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
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="additem" element={<AddItem />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/items/:id" element={<Item />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}
export default App;
