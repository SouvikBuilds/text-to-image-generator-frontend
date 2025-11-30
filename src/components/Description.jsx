import React from "react";
import { assets } from "../assets/assets/assets.js";

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 ">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">
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
          src={assets.sample_img_1}
          alt="image not found"
          className="w-80 xl:w-96 rounded-lg "
        />
        <div>
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
