import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.tsx";

const [state, setState] = useState();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
