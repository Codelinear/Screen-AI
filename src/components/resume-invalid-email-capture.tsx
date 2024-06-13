import type { NextPage } from "next";
import { useCallback } from "react";
import Redirect from "./ui/redirect";
import Link from "next/link";

const ResumeInvalidEmailCapture: NextPage = () => {
  return (
    <div className="w-full relative bg-lavender overflow-hidden flex flex-col items-start justify-start pt-[4.25rem] px-[7.5rem] pb-[16.062rem] box-border gap-[7.125rem] leading-[normal] tracking-[normal] text-left text-[2.294rem] text-gray-100 font-graphik lg:pl-[3.75rem] lg:pr-[3.75rem] lg:box-border mq750:gap-[3.563rem] mq750:pl-[1.875rem] mq750:pr-[1.875rem] mq750:box-border mq450:gap-[1.75rem]">
      <div className="w-[9.688rem] flex flex-col items-start justify-start gap-[0.375rem]">
        <a className="[text-decoration:none] h-[2.5rem] relative tracking-[-0.04em] text-[inherit] inline-block mq450:text-[1.375rem] mq1050:text-[1.813rem]">
          Screen.AI
        </a>
        <div className="self-stretch flex flex-row items-start justify-end text-[0.875rem]">
          <Link
            className="flex flex-row items-center justify-start gap-[0.125rem] cursor-pointer"
            href="https://codelinear.com"
          >
            <div className="relative">by Codelinear</div>
            <Redirect />
          </Link>
        </div>
      </div>
      <footer className="w-[74.144rem] flex flex-col items-start justify-start gap-[7.562rem] max-w-full text-left text-[5.125rem] text-blueviolet-300 font-graphik lg:gap-[3.75rem] mq750:gap-[1.875rem] mq450:gap-[0.938rem]">
        <p className="m-0 self-stretch h-[22.5rem] relative tracking-[-0.04em] inline-block mq450:text-[1.563rem] mq1050:text-[2.563rem]">
          <span>
            Sorry. You unfortunately don’t meet the requirements for this role.
          </span>
          <span className="text-blueviolet-200">
            {" "}
            Subscribe to our newsletter for news on new openings.
          </span>
        </p>
        <div className="w-[57.5rem] flex flex-row flex-wrap items-end justify-start gap-[1.25rem] max-w-full text-[1rem] text-darkslategray">
          <div className="h-[6.063rem] flex-1 [backdrop-filter:blur(9.7px)] rounded-32xl bg-white flex flex-col items-start justify-start py-[2.218rem] px-[2.937rem] box-border gap-[2.718rem] min-w-[22.25rem] max-w-full mq750:min-w-full mq450:gap-[1.375rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
            <div className="mt-[-4.344rem] rounded-[23px] bg-lavender overflow-hidden flex flex-row items-start justify-start p-[0.25rem] whitespace-nowrap">
              <div className="relative">Enter your email</div>
            </div>
            <input
              className="w-[16.638rem] [border:none] [outline:none] bg-[transparent] h-[1.625rem] flex flex-row items-start justify-start py-[0rem] px-[0.062rem] box-border font-graphik text-[1.5rem] text-gray-200 shrink-0"
              placeholder="mukeshb33@gmail.com"
              type="text"
            />
          </div>
          <button className="cursor-pointer [border:none] py-[2.25rem] px-[3rem] bg-blueviolet-200 [backdrop-filter:blur(9.7px)] rounded-32xl overflow-hidden flex flex-row items-start justify-start box-border gap-[0.5rem] whitespace-nowrap max-w-full hover:bg-blueviolet-100 mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
            <div className="relative text-[1.5rem] tracking-[-0.02em] font-graphik text-white text-left">
              Subscribe to newsletter
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ResumeInvalidEmailCapture;
