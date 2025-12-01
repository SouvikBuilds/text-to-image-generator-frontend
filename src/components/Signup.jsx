import React, { useEffect, useRef, useContext } from "react";
import { assets } from "../assets/assets/assets.js";
import { User, MailIcon, LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { gsap } from "gsap";
import { toast } from 'react-toastify';
const Signup = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const formRef = useRef(null);
  const backdropRef = useRef(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success('Account created successfully! Please login.');
        navigate('/login');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error('Network error. Please try again.');
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
      .fromTo(
        formRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      )
      .fromTo(
        formRef.current.querySelectorAll(".input-field"),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1 }
      );
  }, []);
  return (
    <>
      <Navbar />
      <div
        ref={backdropRef}
        className="left-0 top-0 right-0 bottom-0 min-h-[80vh] backdrop-blur-sm bg-black/40 absolute flex justify-center items-center"
      >
        <form
          ref={formRef}
          onSubmit={handleSignup}
          className="relative bg-white p-10 rounded-xl text-slate-500"
        >
          <h1 className="text-center text-neutral-700 font-medium">Sign up</h1>
          <p className="text-sm text-center">Let's create An Account</p>

          <div className="input-field border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <User className="text-slate-500" />
            <input
              type="text"
              name="name"
              id=""
              required
              placeholder="Enter Name"
              className="outline-none text-sm"
            />
          </div>
          <div className="input-field border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <MailIcon className="text-slate-500" />
            <input
              type="email"
              name="email"
              id=""
              required
              placeholder="Enter Your Email id"
              className="outline-none text-sm"
            />
          </div>
          <div className="input-field border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <LockIcon className="text-slate-500" />
            <input
              type="password"
              name="password"
              id=""
              required
              placeholder="Enter Your Password"
              className="outline-none text-sm"
            />
          </div>

          <button
            type="submit"
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
            onClick={() => navigate("/")}
          />
        </form>
      </div>
    </>
  );
};

export default Signup;
