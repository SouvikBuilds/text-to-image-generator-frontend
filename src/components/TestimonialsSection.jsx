import React, { useEffect, useRef } from "react";
import { assets, testimonialsData } from "../assets/assets/assets.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const testimonialsRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonialsRef.current,
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
      testimonialsRef.current.querySelectorAll(".testimonial-card"),
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
    <div className="flex flex-col items-center justify-center my-20 py-12 ">
      <div ref={titleRef}>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2 ">
          Customer Testimonials
        </h1>
        <p className="text-gray-500 mb-12 text-center">
          What our users are saying
        </p>
      </div>

      <div ref={testimonialsRef} className="flex flex-wrap gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all"
          >
            <div className="flex flex-col items-center">
              <img
                src={testimonial.image}
                alt="image not found"
                className="rounded-full w-14"
              />
              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-gray-500 mb-4">{testimonial.role}</p>
              <div className="flex mb-4 items-center">
                {Array(testimonial.stars)
                  .fill(" ")
                  .map((item, index) => (
                    <img src={assets.rating_star} alt="" key={index} />
                  ))}
              </div>
              <p className="text-gray-600 text-center text-sm">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
