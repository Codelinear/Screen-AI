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

      const now = new Date();

      const attempt = {
        status: "attempted",
        expiry: now.getTime() + 24 * 3600 * 1000,
      };

      window.localStorage.setItem("status", JSON.stringify(attempt));

      changeScreen("testScreen");
    } catch (error) {
      setTestLoading(false);
      console.error(error);
    }
  }, [setQuestions, changeScreen]);

  return testLoading ? (
    <QuestionLoading />
  ) : (
    <div className="w-full h-md:absolute h-md:top-[4rem] relative bg-whitesmoke flex flex-col items-start justify-start pt-40 pl-6 pb-9 sm:pl-14 xl:pl-28">
      <div className="flex flex-col items-start justify-start text-darkslategray">
        <h1 className="font-medium w-3/4 tracking-tighter text-[2.563rem] mb-8 sm:mb-16">
          Looks like you show potential! Finish this small test to help us
          understand better.
        </h1>
        <button
          onClick={startTest}
          className="rounded-full bg-blueviolet-200 flex items-center justify-center h-md:py-[2.25rem] py-[1.25rem] h-md:px-[3rem] px-[2rem] text-white cursor-pointer border-none outline-none transition hover:bg-blueviolet-100"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default ResumeValid;
