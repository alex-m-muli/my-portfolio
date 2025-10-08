// src/main.jsx
// Description: Entry point of the React app. 
// - Wraps <App /> with HelmetProvider (for SEO & Open Graph meta tags).
// - Global CSS imported here.

import React from "react";
import ReactDOM from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import App from "./App";
import "./styles/global.css"; 
import { HelmetProvider } from "react-helmet-async";
library.add(faArrowUp, faEnvelope);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* HelmetProvider enables SEO + Open Graph meta tags across the app */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
