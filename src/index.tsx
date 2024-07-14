import '@rainbow-me/rainbowkit/styles.css';
import initializeLibraries from "./initializeLibraries";
import App from "App";
import "assets/styles/index.scss";
import * as buffer from "buffer";
import React from "react";
import ReactDOM from "react-dom";

window.Buffer = buffer.Buffer;

initializeLibraries();

ReactDOM.render(<App />, document.getElementById("root"));
