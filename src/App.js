import React, { useEffect } from "react";
import "./App.css";
import generator from "./utils/generator";

function App() {
  const words = useSelector((state) => state.words.words);

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
