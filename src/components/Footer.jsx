import React from "react";
import { assets } from "../assets/assets/assets.js";
import { GithubIcon, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const connectIcons = [
    {
      icon: <GithubIcon className="h-[20px] w-[20px] " />,
      link: "https://github.com/SouvikBuilds",
    },
    {
      icon: <Twitter className="h-[20px] w-[20px]" />,
      link: "https://x.com/SouvikBuilds",
    },
    {
      icon: <Linkedin className="h-[20px] w-[20px]" />,
      link: "https://www.linkedin.com/in/souvikbuilds04",
    },
    {
      icon: <Instagram className="h-[20px] w-[20px]" />,
      link: "https://www.instagram.com/mr_souvik_chatterjee/",
    },
  ];
  return (
    <div className="flex flex-row items-center justify-between gap-4 py-3 mt-20">
      <div className="logoSection flex flex-row items-center gap-2">
        <img src={assets.logo} alt="" width={150} />
        <div className="h-[20px] w-[1px] bg-black mt-2"></div>
        <p className="mt-2 text-zinc-600 text-sm max-sm:hidden">
          {" "}
          All right reserved. Copyright @imagify
        </p>
      </div>
      <div className="iconSection flex flex-row items-center gap-2">
        {connectIcons.map((icon, index) => (
          <a
            href={icon.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-zinc-200 p-2 rounded-full hover:bg-zinc-300 transition-all duration-300">
              {icon.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
