import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
const App = () => {
  return (
    <div
      className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50
"
    >
      <Outlet />
    </div>
  );
};

export default App;
