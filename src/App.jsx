import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";

function App() {

  return (
    <div className="App">
      {/* Header section */}
      <Header></Header>
      {/* Header section */}
      {/* Meals section */}
      <Meals></Meals>
      {/* Meals section */}
    </div>
  );
}

export default App;
