import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import ItemList from "./pages/ItemList";
import Login from "./pages/Login";
import Navigation from "./Components/Navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const





function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/items" element={<ItemList />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
