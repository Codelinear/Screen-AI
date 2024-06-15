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
    <main className="w-full bg-whitesmoke pt-32 pl-6 pb-9 sm:pl-14 xl:pl-28">
      <h1 className="text-[2rem] sm:text-[3.5rem] text-[#303030] font-bold">
        Tell us about yourself.
      </h1>

      <form onSubmit={onSubmit}>
        <div className="w-[85vw] min-[440px]:w-[66vw] md:w-[42rem] mt-10 h-sm:mb-10 mb-6 flex flex-col text-gray-200">
          <div className="flex md:flex-row flex-col">
            <div className="w-full mb-5">
              <label
                htmlFor="name"
                className="rounded-4xl mb-2 text-start bg-whitesmoke overflow-hidden flex items-center justify-start p-[0.25rem] text-[1rem] text-darkslategray"
              >
                <div className="ml-5">Enter your name</div>
              </label>
              <div className="rounded-full bg-white p-5">
                <input
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={onChange}
                  type="text"
                  className="placeholder:text-[#0000004D] text-black bg-transparent border-none outline-none w-full"
                  autoComplete="off"
                  placeholder="Mukesh B"
                  required
                />
              </div>
            </div>

            <div className="w-full mb-5 md:ml-5">
              <label
                htmlFor="phone"
                className="rounded-4xl mb-2 text-start bg-whitesmoke flex items-center justify-start p-[0.25rem] text-[1rem] text-darkslategray"
              >
                <div className="ml-5">Enter your phone number</div>
              </label>

              <div className="rounded-full bg-white p-5">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={userDetails.phone}
                  onChange={onChange}
                  className="placeholder:text-[#0000004D] text-black bg-transparent border-none outline-none w-full"
                  autoComplete="off"
                  placeholder="98745 09384"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col">
            <div className="w-full mb-5">
              <label
                htmlFor="email"
                className="rounded-4xl mb-2 text-start bg-whitesmoke flex items-center justify-start p-[0.25rem] text-[1rem] text-darkslategray"
              >
                <div className="ml-5">Enter your email</div>
              </label>

              <div className="rounded-full bg-white p-5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={onChange}
                  className="placeholder:text-[#0000004D] text-black bg-transparent border-none outline-none w-full"
                  autoComplete="off"
                  placeholder="mukeshb33@gmail.com"
                  required
                />
              </div>
            </div>
            <div className="w-full mb-5 md:ml-5">
              <label
                htmlFor="linkedInProfile"
                className="rounded-4xl mb-2 text-start bg-whitesmoke flex items-center justify-start p-[0.25rem] text-[1rem] text-darkslategray"
              >
                <div className="ml-5">Paste your LinkedIn profile</div>
                <span className="opacity-50 ml-2">{"(optional)"}</span>
              </label>

              <div className="rounded-full bg-white p-5">
                <input
                  id="linkedInProfile"
                  name="linkedInProfile"
                  type="url"
                  value={userDetails.linkedInProfile}
                  onChange={onChange}
                  className="placeholder:text-[#0000004D] text-black bg-transparent border-none outline-none w-full"
                  autoComplete="off"
                  placeholder="https://www.linkedin.com/in/mukesh-b-a1665"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-full bg-blueviolet-200 flex items-center justify-center h-md:py-[2.25rem] py-[1.25rem] h-md:px-[3rem] px-[2rem] text-white"
        >
          Next
        </button>
      </form>
    </main>
  );
};

export default UserDetails;
