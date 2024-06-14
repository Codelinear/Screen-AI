import React from "react";
import Redirect from "@/components/ui/redirect";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Logo = () => {
  const router = useRouter();

  return (
    <header className="absolute z-10 top-[2rem] h-md:top-[4.25rem] left-6 sm:left-[3.5rem] xl:left-[7.5rem] flex flex-col items-end justify-start gap-[0.375rem] text-[2rem] h-md:text-[2.294rem] text-gray-100">
      <h3>Screen.AI</h3>
      <Link
        className="flex flex-row items-center justify-start gap-[0.125rem] cursor-pointer text-[0.875rem]"
        href="https://codelinear.com"
      >
        <p className="relative">by Codelinear</p>
        <Redirect />
      </Link>
    </header>
  );
};

export default Logo;
