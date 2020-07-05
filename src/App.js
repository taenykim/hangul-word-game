import React, { useEffect } from "react";
import "./App.css";
import generator from "./utils/generator";

function App() {
  useEffect(() => {
    generator();

    // window.addEventListener("mousemove", (e) => {
    //   // const [_innerWidth, _innerHeight] = generator();
    //   const target = document.getElementById("target");
    //   console.log(target.style.top);
    //   target.style.top = e.clientY + "px";
    //   target.style.left = e.clientX + "px";
    //   console.log(target.style.top);
    //   console.log(e.clientX);
    // });
    // window.addEventListener("mousedown",(e)=>{
  });
  return <div id="App"></div>;
}

export default App;
