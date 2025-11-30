import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets/assets.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Description = () => {
  const descRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: descRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(descRef.current.querySelector('.title'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
    .fromTo(descRef.current.querySelector('.subtitle'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
    .fromTo(imageRef.current,
      { x: -100, opacity: 0, rotation: -5 },
      { x: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(textRef.current.children,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.2 }
    );
  }, []);
  return (
    <div ref={descRef} className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
      <h1 className="title text-3xl sm:text-4xl font-semibold mb-2 ">
        Create AI Images
      </h1>
      <p className="subtitle text-gray-500 mb-8">
        Turn Your{" "}
        <span
          className="text-[18px] font-semibold bg-gradient-to-b from-blue-500 to-purple-500 bg-clip-text text-transparent text-xl font-bold
"
        >
          Imagination
        </span>{" "}
        into{" "}
        <span className="text-[18px] font-semibold bg-gradient-to-b from-purple-500 to-orange-400 bg-clip-text text-transparent text-xl font-bold">
          Visuals
        </span>
      </p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center ">
        <img
          ref={imageRef}
          src={assets.sample_img_1}
          alt="image not found"
          className="w-80 xl:w-96 rounded-lg "
        />
        <div ref={textRef}>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the{" "}
            <span className="font-semibold bg-gradient-to-b from-teal-300 to-blue-500 bg-clip-text text-transparent">
              AI-powered Text
            </span>{" "}
            to{" "}
            <span className="font-semibold bg-gradient-to-b from-indigo-900 to-teal-300 bg-clip-text text-transparent">
              image
            </span>{" "}
            Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Easily bring your ideas to life with our AI-powered text to image
            generator. whether you need stunning visuals or unique imagery, our
            tools transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life
            instantly.{" "}
          </p>

          <p className="text-gray-600">
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don’t yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
