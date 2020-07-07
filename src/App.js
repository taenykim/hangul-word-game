import React, { useEffect } from "react";
import "./App.css";
import generator from "./utils/generator";

function App() {
  console.log(words);
  useEffect(() => {
    generator();
  }, []);

  return (
    <div id="App">
      <div id="words">{words}</div>
    </div>
  );
}

export default App;
