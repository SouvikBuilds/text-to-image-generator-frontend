import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets/assets.js";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headerRef.current.querySelector(".badge"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    )
      .fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(
        headerRef.current.querySelector(".description"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      )
      .fromTo(
        imagesRef.current.children,
        { scale: 0, rotation: 180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      )
      .fromTo(
        headerRef.current.querySelector(".footer-text"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 }
      );
  }, []);
  return (
    <div
      ref={headerRef}
      className="flex flex-col justify-center items-center text-center my-20"
    >
      <div className="badge text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500">
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="image not found" />
      </div>

      <h1
        ref={titleRef}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
      >
        Turn Text to <span className="text-blue-600">Image</span>, in Seconds
      </h1>

      <p className="description text-center max-w-xl mx-auto mt-5">
        Unleash your creativity with AI. Turn your{" "}
        <span
          className="bg-gradient-to-b from-blue-500 to-purple-500 bg-clip-text text-transparent text-xl font-bold
"
        >
          Imagination
        </span>{" "}
        into{" "}
        <span
          className="bg-gradient-to-b from-purple-500 to-orange-400 bg-clip-text text-transparent text-xl font-bold
"
        >
          Visual Art
        </span>{" "}
        in seconds - just type and watch the magic happen.
      </p>

      <button
        ref={buttonRef}
        type="button"
        className="sm:text-lg text-white bg-black w-auto mt-8 mx-12 py-3 flex items-center gap-2 rounded-full px-12 cursor-pointer active:bg-gray-800 duration-200 transition transform ease-in-out"
        onClick={() => navigate("/result")}
      >
        Generate Images
        <img src={assets.star_group} alt="" className="h-6" />
      </button>

      <div
        ref={imagesRef}
        className="flex items-center gap-3 flex-wrap justify-center mt-16"
      >
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              key={index}
              width={70}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
            />
          ))}
      </div>

      <p className="footer-text mt-2 text-neutral-600">
        Generated Images from{" "}
        <span
          className="text-xl bg-gradient-to-b from-indigo-500 to-purple-800 bg-clip-text text-transparent font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Imagify
        </span>
      </p>
    </div>
  );
};

export default Header;
