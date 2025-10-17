// src/main.jsx
// Description: Entry point of the React app.
// - Initializes FontAwesome icons globally.
// - Renders <App /> inside React.StrictMode.
// - Global CSS imported here.

import React from "react";
import ReactDOM from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import App from "./App";
import "./styles/global.css";

// ✅ Register icons globally
library.add(faArrowUp, faEnvelope);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
