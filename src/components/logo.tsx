import React from "react";
import Redirect from "@/components/ui/redirect";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Logo = () => {
  const router = useRouter();

  return (
    <header
      id="logo"
      className="absolute z-[60] text-[#202020] top-[2rem] h-md:top-[4.25rem] left-6 sm:left-[3.5rem] xl:left-[7.5rem]"
    >
      <h2 className="text-2xl pointer-events-none">Support.AI</h2>
      <div
        className="flex hover:underline transition text-[10px] items-center cursor-pointer justify-end ml-auto"
        onClick={() => router.push("https://codelinear.com/")}
      >
        <h4 className="mr-1 pt-0.5">by Codelinear</h4>
        <Redirect />
      </div>
    </header>
  );
};

export default Logo;
