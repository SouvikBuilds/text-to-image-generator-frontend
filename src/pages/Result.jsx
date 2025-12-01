import React, { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../assets/assets/assets.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { gsap } from "gsap";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const { user, backendUrl, setCredit, credit } = useContext(AppContext);
  const navigate = useNavigate();
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to generate images");
      return;
    }
    if (!input.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    if (credit === 0) {
      toast.info("No credits left! Redirecting to pricing...");
      navigate("/buy-credit");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${backendUrl}/api/v1/images/generate?userId=${user._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ prompt: input }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setImage(data.data.image);
        setIsImageLoaded(true);
        setCredit(data.data.creditBalance);
        toast.success("Image generated successfully!");
      } else {
        toast.error(data.message || "Image generation failed");
      }
    } catch (error) {
      console.error("Image generation failed:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <form
        ref={formRef}
        className="flex flex-col min-h-[90vh] justify-center items-center"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              ref={imageRef}
              src={image}
              alt=""
              className="max-w-sm rounded"
              key={image}
            />
            <span
              className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
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
              name="prompt"
              id=""
              placeholder="Describe what you want to generate"
              className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="submit"
              className="text-white bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer"
              disabled={!user || isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        )}

        {isImageLoaded && (
          <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 rounded-full mt-10">
            <p
              className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
              onClick={() => {
                if (credit === 0) {
                  toast.info("No credits left! Choose a plan");
                  navigate("/buy-credit");
                } else {
                  setIsImageLoaded(false);
                }
              }}
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
