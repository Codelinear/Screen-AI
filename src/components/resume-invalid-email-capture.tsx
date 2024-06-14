import type { NextPage } from "next";

const ResumeInvalidEmailCapture: NextPage = () => {
  return (
    <div className="w-full h-screen relative bg-lavender flex flex-col items-start justify-start pt-28 pl-6 md:pb-0 pb-10 sm:pl-14 xl:pl-28 text-[2.294rem] text-gray-100">
      <footer className="w-[50rem] flex flex-col items-start justify-start max-w-full text-[2rem] lg:text-5xl text-blueviolet-300 gap-[3.75rem]">
        <p className="m-0 self-stretch mt-8">
          <span>
            Sorry. You unfortunately don’t meet the requirements for this role.
          </span>
          <span className="text-blueviolet-200">
            {" "}
            Subscribe to our newsletter for news on new openings.
          </span>
        </p>
        <div className="w-[57.5rem] flex flex-row flex-wrap items-end justify-start gap-[1.25rem] max-w-full text-[1rem] text-darkslategray">
          <div className="rounded-full flex flex-col items-start justify-start min-w-[28.25rem] max-w-full">
            <label
              htmlFor="newsletter-email"
              className="ml-5 mb-4 rounded-[23px] bg-lavender"
            >
              <div className="relative">Enter your email</div>
            </label>
            <input
              id="newsletter-email"
              className="w-full border-none outline-none rounded-full p-4 bg-white text-[1rem] text-gray-200"
              placeholder="mukeshb33@gmail.com"
              type="email"
            />
          </div>
          <button className="cursor-pointer py-[1.25rem] px-[2rem] bg-blueviolet-200 rounded-full flex flex-row items-start justify-start max-w-full transition hover:bg-blueviolet-100">
            <div className="text-[1rem] text-white">
              Subscribe to newsletter
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ResumeInvalidEmailCapture;
