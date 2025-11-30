import React from "react";
import { assets } from "../assets/assets/assets.js";

const GenerateBtn = () => {
  return (
    <div className="flex flex-col justify-center items-center pb-16">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-14">
        See the Magic, Try Now.
      </h1>

      <button
        type="button"
        className=" flex items-center justify-center px-12 py-3 gap-2 rounded-full bg-black text-white m-auto cursor-pointer hover:scale-[1.02] duration-200 transition-all active:bg-gray-800 ease-in-out"
      >
        Generate Now
        <img src={assets.star_group} alt="" className="h-6" />
      </button>
    </div>
  );
};

export default GenerateBtn;
