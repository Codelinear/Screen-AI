"use client";

import React from "react";
import Redirect from "@/components/ui/redirect";
import { useStore } from "@/store";

const Logo = () => {
  const { changeScreen } = useStore();

  return (
    <header
      id="logo"
      className="absolute z-[60] text-[#202020] top-[1rem] h-sm:top-[2rem] h-md:top-[4.25rem] left-6 sm:left-[3.5rem] xl:left-[7.5rem]"
    >
      <h2
        onClick={() => {
          changeScreen("home");
        }}
        className="font-medium text-2xl cursor-pointer"
      >
        Screen.AI
      </h2>
      <div
        className="flex hover:underline transition text-[10px] items-center cursor-pointer justify-end ml-auto"
        onClick={() => window.open("https://codelinear.com/", "_blank")}
      >
        <h4 className="mr-1 mt-[0.05rem]">by Codelinear</h4>
        <Redirect />
      </div>
    </header>
  );
};

export default Logo;
