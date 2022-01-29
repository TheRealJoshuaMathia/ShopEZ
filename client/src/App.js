import React from "react";
import Navbar from "./Components/Navbar";

import Footer from "./Components/Footer";
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="app-container">
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="/itemList">Items</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Footer />
    </div>
  );
}
export default App;
