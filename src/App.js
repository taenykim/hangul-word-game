import React, { useEffect } from "react";
import "./App.css";
import generator from "./utils/generator";

function App() {
  useEffect(() => {
    generator();
  }, []);

  return (
    <div id="App">
      <div id="words"></div>
    </div>
  );
}

export default App;
