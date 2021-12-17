import React from "react";
import ItemList from "./Components/ItemList";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="items" element={<ItemList />} />
      </Routes>
    </div>
  );
}

export default App;
