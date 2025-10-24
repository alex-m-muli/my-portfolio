// src/main.jsx
// Description: Entry point of the React app.
// - Updated for React 19: Removed HelmetProvider (no longer needed).
// - Added Service Worker registration for offline support and PWA install.
// - Global CSS imported.
// - Maintains all functionality and structure..

import React from "react";
import ReactDOM from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import App from "./App";
import "./styles/global.css";

library.add(faArrowUp, faEnvelope);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ React 19 handles native metadata; HelmetProvider removed */}
    <App />
  </React.StrictMode>
);

// =======================
// Service Worker Registration (PWA/Offline)
// =======================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(reg => console.log('✅ Service Worker registered:', reg.scope))
      .catch(err => console.error('❌ Service Worker registration failed:', err));
  });
}