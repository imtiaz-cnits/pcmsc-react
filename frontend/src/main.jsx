import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/all-modal.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/dark-mode.css";
import "./assets/css/navbar-sidebar.css";
import "./assets/css/style.css";
import "./assets/css/table-funtion.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import setupInterceptor from "./utils/axiosInterceptors.js";

setupInterceptor(); // its setup interceptors before start the app

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
