import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Auth0Context from "./components/functional/Auth0Context";

ReactDOM.render(
  <React.StrictMode>
  <Auth0Context>
    <App />
  </Auth0Context>
</React.StrictMode>,
  document.getElementById("root")
);
