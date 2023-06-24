import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [count, setCount] = useState(0);

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
