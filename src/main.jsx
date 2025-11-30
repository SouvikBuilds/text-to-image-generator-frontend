import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BuyCredit from "./pages/BuyCredit.jsx";
import Result from "./pages/Result.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/buy-credit",
        element: <BuyCredit />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);
