import type { NextPage } from "next";
import Redirect from "./ui/redirect";
import Link from "next/link";

const TestLoading: NextPage = () => {
  return (
    <div className="w-full relative bg-whitesmoke overflow-hidden flex flex-col items-start justify-start pt-[2.25rem] h-lg:pt-[4.25rem] px-[7.5rem] pb-[2.875rem] h-lg:pb-[30.875rem] box-border gap-[3.2rem] h-lg:gap-[7.125rem] leading-[normal] tracking-[normal] text-left text-[2.294rem] text-gray font-graphik lg:pl-[3.75rem] lg:pr-[3.75rem] lg:box-border mq450:gap-[1.75rem] mq750:gap-[3.563rem] mq750:pl-[1.875rem] mq750:pr-[1.875rem] mq750:box-border">
      <div className="w-[9.688rem] flex flex-col items-start justify-end h-lg:justify-start gap-[0.375rem]">
        <a className="[text-decoration:none] h-[2.5rem] relative tracking-[-0.04em] text-[inherit] inline-block mq450:text-[1.375rem] mq1050:text-[1.813rem]">
          Screen.AI
        </a>
        <div className="self-stretch flex flex-row items-center justify-end text-[0.875rem]">
          <Link
            href={"https://codelinear.com"}
            className="flex flex-row items-start justify-start gap-[0.125rem] cursor-pointer"
          >
            <div className="relative">by Codelinear</div>
            <Redirect />
          </Link>
        </div>
      </div>
      <div className="w-[63.638rem] flex flex-col items-start justify-start gap-[7.687rem] max-w-full text-[3.125rem] h-lg:text-[5.125rem] text-darkslategray mq450:gap-[0.938rem] mq750:gap-[1.938rem] mq1050:gap-[3.813rem]">
        <h1 className="m-0 self-stretch h-[7.25rem] h-lg:h-[11.25rem] relative text-inherit tracking-[-0.04em] font-normal font-inherit inline-block mq450:text-[1.563rem] mq1050:text-[2.563rem]">
          Give us a moment while we check if you are the right fit.
        </h1>
        <div className="w-[60.75rem] hidden h-[2.438rem] relative rounded-6xl [background:linear-gradient(90deg,_#ebdfff,_#f5afea)] overflow-hidden shrink-0 max-w-full">
          <div className="absolute top-[0rem] left-[0rem] rounded-6xl [background:linear-gradient(90deg,_#ebdfff,_#f5afea)] w-full h-full overflow-hidden hidden" />
        </div>
      </div>
    </div>
  );
};

export default TestLoading;
