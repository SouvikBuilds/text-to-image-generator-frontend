import React, { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../assets/assets/assets.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { gsap } from "gsap";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const formRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0, rotation: 5 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }
    ).fromTo(
      formRef.current.querySelector(".input-container"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
  }, []);

  const onSubmitHandler = async (e) => {};
  return (
    <>
      <Navbar />
      <form
        ref={formRef}
        className="flex flex-col min-h-[90vh] justify-center items-center"
        onSubmit={onSubmitHandler}
      >
        <div>
          <div className="relative ">
            <img
              ref={imageRef}
              src={image}
              alt=""
              className="max-w-sm rounded "
            />
            <span
              className={`absolute bottom-0 left-0 h-1 bg-blue-500  ${
                isLoading ? "w-full transition-all duration-[10s]" : "w-0"
              }`}
            />
          </div>
          <p className={!isLoading ? "hidden" : ""}>Loading...</p>
        </div>

        {!isImageLoaded && (
          <div className="input-container flex items-center w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="Describe what you want to generate"
              className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="submit"
              className="text-white bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer"
            >
              Generate
            </button>
          </div>
        )}

        {isImageLoaded && (
          <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 rounded-full mt-10">
            <p
              className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
              onClick={() => setIsImageLoaded(false)}
            >
              Generate Another
            </p>
            <a
              href={image}
              download
              className="bg-zinc-900 px-10 py-3 cursor-pointer rounded-full"
            >
              Download
            </a>
          </div>
        )}
      </form>
      <Footer />
    </>
  );
};

export default Result;
