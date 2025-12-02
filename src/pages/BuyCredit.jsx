import React, { useContext, useEffect, useRef } from "react";
import { assets, plans } from "../assets/assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, setCredit, credit } = useContext(AppContext);
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const cardsRef = useRef(null);

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_TEST_API_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/v1/users/verify-razorpay`,
            response,
            { withCredentials: true }
          );
          if (data.success) {
            setCredit(data.data.credit);
            navigate("/");
            toast.success("Credit added");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/users/pay-razorpay`,
        { planId },
        {
          withCredentials: true,
        }
      );
      console.log("Backend response:", data);
      if (data.success) {
        initPay(data.data);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      pageRef.current.querySelector(".page-button"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    )
      .fromTo(
        pageRef.current.querySelector(".page-title"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        cardsRef.current.children,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }
      );
  }, []);
  return (
    <>
      <Navbar />
      <div ref={pageRef} className="min-h-[80vh] text-center pt-14 mb-10">
        <button
          type="button"
          className="page-button border border-gray-400 px-10 py-2 rounded-full mb-6"
        >
          Our Plans
        </button>
        <h1 className="page-title text-center text-3xl font-medium mb-6 sm:mb-10">
          Choose the plan
        </h1>

        <div
          ref={cardsRef}
          className="flex flex-wrap justify-center gap-6 text-left"
        >
          {plans.map((item, index) => (
            <div
              key={index}
              className="bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              <img width={40} src={assets.logo_icon} alt="" />
              <p className="mt-3 mb-1 font-semibold">{item.id}</p>
              <p className="text-sm ">{item.desc}</p>
              <p className="mt-6">
                <span className="text-3xl font-medium">${item.price}</span> /{" "}
                {item.credits} credits
              </p>

              <button
                type="button"
                className="text-center w-full px-12 py-4 rounded-lg bg-gray-800 text-sm text-white mt-8 min-w-52 hover:scale-[1.02] transition-all hover:bg-gray-600 cursor-pointer duration-500 transform ease-in-out"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else {
                    paymentRazorpay(item.id);
                  }
                }}
              >
                {user ? "Purchase" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyCredit;
