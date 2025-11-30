import React, { useEffect, useRef } from "react";
import { assets, stepsData } from "../assets/assets/assets.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Steps = () => {
  const stepsRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 }
    ).fromTo(
      stepsRef.current.querySelectorAll(".step-item"),
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
    );
  }, []);
  return (
    <div className="flex flex-col items-center justify-center my-32 ">
      <div ref={titleRef}>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-center">
          How it works
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Transform words into stunning images
        </p>
      </div>

      <div ref={stepsRef} className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="step-item flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md rounded-lg cursor-pointer hover:scale-[1.02] transition-all duration-300"
          >
            <img width={40} src={item.icon} alt="" />
            <div>
              <h2 className="text-xl font-medium">{item.title}</h2>
              <p className="text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
