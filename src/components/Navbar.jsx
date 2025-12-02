import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets/assets.js";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { gsap } from "gsap";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const redirectToHomePage = () => {
    navigate("/");
  };
  const { user, setUser, backendUrl, credit, setCredit } =
    useContext(AppContext);
  const navRef = useRef(null);

  const fetchUserCredit = async () => {
    if (!user) return;
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/credit`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setCredit(data.data.credit);
      }
    } catch (error) {
      console.error("Failed to fetch credit:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${backendUrl}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem('accessToken');
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    gsap.fromTo(
      navRef.current.children,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserCredit();
    }
  }, [user]);
  return (
    <div ref={navRef} className="flex items-center justify-between py-4">
      <div className="imageSection">
        <img
          src={assets.logo}
          alt=""
          className="w-28 sm:w-32 lg:w-40 cursor-pointer"
          onClick={redirectToHomePage}
        />
      </div>

      <div>
        {user ? (
          <div className="flex text-center justify-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-[1.5] sm:py-3 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer">
              <img src={assets.credit_star} alt="" className="w-5" />
              <p
                className="text-xs sm:text-sm font-medium text-gray-600"
                onClick={() => navigate("/buy-credit")}
              >
                Credit Left: {credit || 0}
              </p>
            </button>
            <div className="flex items-center justify-center gap-2">
              <p className="text-gray-600 max-sm:hidden pl-4">
                Hi {user?.name}
              </p>

              <div className="relative group cursor-pointer">
                <img
                  src={assets.profile_icon}
                  alt=""
                  className="w-10 drop-shadow"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md  text-sm">
                    <li
                      className="py-1 px-2 cursor-pointer pr-10"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              className="cursor-pointer "
              onClick={() => navigate("buy-credit")}
            >
              Pricing
            </p>
            <button
              type="button"
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer duration-200 active:bg-zinc-600 transition-all transform ease-in-out"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
