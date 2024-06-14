"use client";

import type { NextPage } from "next";
import { userDetailsSchema } from "@/lib/validator";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import Link from "next/link";
import Redirect from "./ui/redirect";

const UserDetails: NextPage = () => {
  const [userDetails, setUserDetails] = useState<
    z.infer<typeof userDetailsSchema>
  >({
    name: "",
    phone: "",
    email: "",
    linkedInProfile: "",
  });

  const { changeScreen, setUserDetails: setDetails } = useStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDetails(userDetails);

    const status = window.localStorage.getItem("status");

    if (status === "attempted") {
      changeScreen("chatScreen");
      return;
    }

    changeScreen("uploadResume");
  };

  return (
    <div className="w-full relative bg-whitesmoke h-[55rem] min-[840px]:h-[100vh] h-lg:h-[67.5rem] overflow-hidden text-left text-[1.5rem] text-darkslategray font-graphik">
      <div className="absolute  top-[8.25rem] h-md:top-[10.25rem] h-lg:top-[15.25rem] left-[3.5rem] xl:left-[7.5rem] text-[3.125rem] h-md:text-[5.125rem] tracking-[-0.04em]">
        Tell us about yourself.
      </div>

      <form onSubmit={onSubmit}>
        <div className="absolute top-[16.375rem] h-md:top-[21.375rem] h-lg:top-[27.375rem] left-[3.5rem] xl:left-[7.5rem] w-[22rem] min-[840px]:w-[46rem] xl:w-[69.563rem] flex flex-row flex-wrap items-start justify-start gap-[3rem_1.25rem] h-md:gap-[4.5rem_1.25rem] text-gray-200">
          <div className="w-[22rem] min-[1280px]:w-[34.125rem] relative [backdrop-filter:blur(9.7px)] rounded-32xl bg-white h-[4.063rem] h-md:h-[6.063rem]">
            <label
              htmlFor="name"
              className="absolute top-[-2.125rem] left-[2.938rem] rounded-4xl bg-whitesmoke overflow-hidden flex flex-row items-center justify-center p-[0.25rem] text-[1rem] text-darkslategray"
            >
              <div className="relative">Enter your name</div>
            </label>
            <input
              id="name"
              name="name"
              value={userDetails.name}
              onChange={onChange}
              type="text"
              className="placeholder:text-[#0000004D] text-black bg-transparent border-none outline-none absolute top-1/2 -translate-y-1/2 mx-9 w-[85%] tracking-[-0.02em]"
              autoComplete="off"
              placeholder="Mukesh B"
              required
            />
          </div>

          <div className="w-[22rem] min-[1280px]:w-[34.125rem] relative [backdrop-filter:blur(9.7px)] rounded-32xl bg-white h-[4.063rem] overflow-hidden h-md:h-[6.063rem] text-darkslategray">
            <label
              htmlFor="phone"
              className="absolute top-[-2.125rem] left-[2.938rem] rounded-4xl bg-whitesmoke flex flex-row items-center justify-center p-[0.25rem] text-[1rem]"
            >
              <div className="relative">Enter your phone number</div>
            </label>
            <div className="absolute top-[calc(50%_-_20.8px)] left-[3.013rem] flex flex-row items-center justify-start gap-[1.312rem] text-black">
              <div className="relative tracking-[-0.02em]">+91</div>
              <div className="w-[0.063rem] relative box-border h-[2.663rem] border-r-[1px] border-solid border-black" />
            </div>

            <input
              id="phone"
              name="phone"
              type="text"
              value={userDetails.phone}
              onChange={onChange}
              className="placeholder:text-[#0000004D] text-black bg-transparent border-none outline-none absolute top-1/2 -translate-y-1/2 left-[6rem] mx-9 w-[65%] tracking-[-0.02em]"
              autoComplete="off"
              placeholder="98745 09384"
              required
            />
          </div>
          <div className="w-[22rem] md:w-[30rem]  min-[1280px]:w-[34.125rem] relative [backdrop-filter:blur(9.7px)] rounded-32xl bg-white h-[4.063rem] h-md:h-[6.063rem]">
            <input
              id="email"
              name="email"
              type="email"
              value={userDetails.email}
              onChange={onChange}
              className="placeholder:text-[#0000004D] text-black bg-transparent border-none outline-none absolute top-1/2 -translate-y-1/2 mx-9 w-[85%] tracking-[-0.02em]"
              autoComplete="off"
              placeholder="mukeshb33@gmail.com"
              required
            />

            <label
              htmlFor="email"
              className="absolute top-[-2.125rem] left-[2.938rem] rounded-4xl bg-whitesmoke overflow-hidden flex flex-row items-center justify-center p-[0.25rem] text-[1rem] text-darkslategray"
            >
              <div className="relative h-lg:text-white">Enter your email</div>
            </label>
          </div>
          <div className="w-[22rem] min-[1280px]:w-[34.125rem] relative [backdrop-filter:blur(9.7px)] rounded-32xl bg-white h-[4.063rem] h-md:h-[6.063rem]">
            <input
              id="linkedInProfile"
              name="linkedInProfile"
              type="url"
              value={userDetails.linkedInProfile}
              onChange={onChange}
              className="placeholder:text-[#0000004D] text-black bg-transparent border-none outline-none absolute top-1/2 -translate-y-1/2 mx-9 w-[85%] tracking-[-0.02em]"
              autoComplete="off"
              placeholder="https://www.linkedin.com/in/mukesh-b-a1665"
            />

            <label
              htmlFor="linkedInProfile"
              className="absolute top-[-2.125rem] left-[2.938rem] rounded-4xl bg-whitesmoke overflow-hidden flex flex-row items-center justify-center p-[0.25rem] text-[1rem] text-darkslategray"
            >
              <div className="relative">Paste your LinkedIn profile</div>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="absolute top-[45.625rem] min-[840px]:top-[29.625rem] h-md:top-[41.625rem] h-lg:top-[48.625rem] left-[3.5rem] xl:left-[7.5rem] [backdrop-filter:blur(9.7px)] rounded-32xl bg-blueviolet-200 overflow-hidden flex flex-row items-center justify-center h-md:py-[2.25rem] py-[1.25rem] h-md:px-[3rem] px-[2rem] text-white"
        >
          <p className="relative tracking-[-0.02em]">Next</p>
        </button>
      </form>

      <div className="absolute top-[2rem] h-md:top-[4.25rem] left-[3.5rem] xl:left-[7.5rem] flex flex-col items-end justify-start gap-[0.375rem] text-[2rem] h-md:text-[2.294rem] text-gray-100">
        <div className="relative tracking-[-0.04em]">Screen.AI</div>
        <Link
          className="flex flex-row items-start justify-start gap-[0.125rem] cursor-pointer text-[0.875rem]"
          href="https://codelinear.com"
        >
          <div className="relative">by Codelinear</div>
          <Redirect />
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
