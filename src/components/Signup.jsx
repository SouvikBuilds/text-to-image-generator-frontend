import React from "react";
import { assets } from "../assets/assets/assets.js";
import { User, MailIcon, LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="left-0 top-0 right-0 bottom-0 min-h-[80vh] backdrop-blur-sm bg-black/40 absolute flex justify-center items-center">
        <form
          action=""
          className="relative bg-white p-10 rounded-xl text-slate-500"
        >
          <h1 className="text-center text-neutral-700 font-medium">Sign up</h1>
          <p className="text-sm text-center">Let's create An Account</p>

          <div className=" border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <User className="text-slate-500" />
            <input
              type="text"
              name=""
              id=""
              required
              placeholder="Enter Name"
              className="outline-none text-sm"
            />
          </div>
          <div className=" border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <MailIcon className="text-slate-500" />
            <input
              type="email"
              name=""
              id=""
              required
              placeholder="Enter Your Email id"
              className="outline-none text-sm"
            />
          </div>
          <div className=" border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <LockIcon className="text-slate-500" />
            <input
              type="password"
              name=""
              id=""
              required
              placeholder="Enter Your Password"
              className="outline-none text-sm"
            />
          </div>

          <button
            type="button"
            className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer mt-3"
          >
            Sign up
          </button>
          <p className="text-sm text-slate-500 text-center mt-3">
            Already Have An Account?{" "}
            <span
              className=" text-blue-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>

          <img
            src={assets.cross_icon}
            alt=""
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => navigate(window.history.back())}
          />
        </form>
      </div>
    </>
  );
};

export default Signup;
