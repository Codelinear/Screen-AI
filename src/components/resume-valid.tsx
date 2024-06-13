"use client";

import Link from "next/link";
import React, { useCallback, useState } from "react";
import Redirect from "./ui/redirect";
import { NextPage } from "next";
import { useStore } from "@/store";
import axios from "axios";
import QuestionLoading from "./question-loading";

const ResumeValid: NextPage = () => {
  const [testLoading, setTestLoading] = useState(false);

  const { setQuestions, changeScreen } = useStore();

  const startTest = useCallback(async () => {
    try {
      setTestLoading(true);

      const response = await axios.post("/api/ai/generate");

      setTestLoading(false);

      setQuestions(response.data.output.questions);

      // window.localStorage.setItem("status", "attempted");

      changeScreen("testScreen");
    } catch (error) {
      setTestLoading(false);
      console.error(error);
    }
  }, [setQuestions, changeScreen]);

  return (
    testLoading ? <QuestionLoading /> : <div className="w-full relative bg-whitesmoke overflow-hidden flex flex-col items-start justify-start pt-[4.25rem] px-[7.5rem] pb-[26rem] box-border gap-[7.125rem] leading-[normal] tracking-[normal] text-left text-[2.294rem] text-gray font-graphik lg:pl-[3.75rem] lg:pr-[3.75rem] lg:box-border mq450:gap-[1.75rem] mq750:gap-[3.563rem] mq750:pl-[1.875rem] mq750:pr-[1.875rem] mq750:box-border">
    <div className="w-[9.688rem] flex flex-col items-start justify-start gap-[0.375rem]">
      <h3 className="[text-decoration:none] h-[2.5rem] relative tracking-[-0.04em] text-[inherit] inline-block mq450:text-[1.375rem] mq1050:text-[1.813rem]">
        Screen.AI
      </h3>
      <div className="self-stretch flex flex-row items-center justify-end text-[0.875rem]">
        <Link
          className="flex flex-row items-start justify-start gap-[0.125rem] cursor-pointer"
          href="https://codelinear.com"
        >
          <div className="relative">by Codelinear</div>
          <Redirect />
        </Link>
      </div>
    </div>
    <div className="w-[70.813rem] flex flex-col items-start justify-start gap-[3.25rem] max-w-full text-[5.125rem] text-darkslategray mq750:gap-[1.625rem]">
      <h1 className="m-0 self-stretch h-[16.875rem] relative text-inherit tracking-[-0.04em] font-normal font-inherit inline-block mq450:text-[1.563rem] mb-10 mq1050:text-[2.563rem]">
        Looks like you show potential! Finish this small test to help us
        understand better.
      </h1>
      <button
        onClick={startTest}
        className="cursor-pointer [border:none] py-[2.25rem] px-[3rem] bg-blueviolet-200 [backdrop-filter:blur(9.7px)] rounded-[51px] overflow-hidden flex flex-row items-start justify-start whitespace-nowrap hover:bg-blueviolet-100"
      >
        <div className="relative text-[1.5rem] tracking-[-0.02em] font-graphik text-white text-left">
          Start Test
        </div>
      </button>
    </div>
  </div>
  );
};

export default ResumeValid;
