import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import ItemList from "./routes/ItemList";
import Login from "./routes/Login";
import Navigation from "./Components/Navigation";

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
