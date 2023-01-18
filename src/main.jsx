import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { RouterPage } from "./router/routes";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "./context/SessionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SessionProvider>
    <RouterProvider router={RouterPage} />
    <ToastContainer />
  </SessionProvider>
);
