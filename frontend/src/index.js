import React from "react";
import { render } from "react-dom";

// Components
import App from "./containers/App";

render(<App />, document.getElementById("app"));

module.hot.accept();
