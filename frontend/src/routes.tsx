import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/client/home";
import LoginPage from "@pages/auth/login";
import LayoutClient from "@pages/client/layout.client";
import SignupPage from "@pages/auth/signup";
import NotFound from "@components/share/not.found";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayoutClient />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);
