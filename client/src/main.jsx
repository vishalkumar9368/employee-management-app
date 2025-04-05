import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { EmployeeProvider } from "./context/EmployeeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <EmployeeProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </EmployeeProvider>
    </AuthProvider>
  </BrowserRouter>
);
