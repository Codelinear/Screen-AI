import type { NextPage } from "next";
import { useState } from "react";
import TickWhite from "./ui/tick-white";

const ResumeInvalidEmailCapture: NextPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <div className="w-full min-h-screen bg-lavender flex flex-col items-start justify-start pt-28 px-6 pb-10 sm:px-14 xl:px-28 text-[2.294rem] text-gray-100">
      <div className="w-[50rem] h-md:absolute h-md:top-[11rem] flex flex-col items-start justify-start max-w-full text-[2rem] lg:text-5xl text-blueviolet-300 gap-[3.75rem]">
        <p className="m-0 self-stretch mt-8">
          <span>
            Sorry. You unfortunately don’t meet the requirements for this role.
          </span>
          <span className="text-blueviolet-200">
            {" "}
            Subscribe to our newsletter for news on new openings.
          </span>
        </p>
        <form
          onSubmit={onSubmit}
          className="w-[57.5rem] pr-4 flex flex-wrap items-end justify-start gap-[1.25rem] max-w-full text-[1rem] text-darkslategray"
        >
          <div className="rounded-full flex flex-col items-start justify-start w-full sm:w-[28.25rem] max-w-full">
            <label
              htmlFor="newsletter-email"
              className="ml-5 mb-4 rounded-[23px] bg-lavender"
            >
              <div className="relative">Enter your email</div>
            </label>
            <input
              id="newsletter-email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full border-none outline-none rounded-full p-4 bg-white text-[1rem] text-gray-200"
              placeholder="mukeshb33@gmail.com"
              type="email"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer sm:w-auto w-full py-[1rem] px-[2rem] bg-blueviolet-200 rounded-full transition flex items-center hover:bg-blueviolet-100 text-center text-[1rem] text-white"
          >
            {isSubscribed && <TickWhite />}
            {isSubscribed ? "Subscribed!" : "Subscribe to newsletter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeInvalidEmailCapture;
