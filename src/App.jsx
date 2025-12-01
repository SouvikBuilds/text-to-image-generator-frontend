import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { gsap } from "gsap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const appRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(appRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, []);
  return (
    <div
      ref={appRef}
      className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50
"
    >
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="dark"
      />
    </div>
  );
};

export default App;
