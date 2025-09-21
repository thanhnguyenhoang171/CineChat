import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import App from "./App.tsx";
import "./index.css";
import { ToastProvider } from "./components/share/toast.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeInit />
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);

initThemeMode();
