"use client";

import { useStore } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import Redirect from "./ui/redirect";
import Link from "next/link";
import { checkAnswer, isCandidateSelected } from "@/lib/functions";
import { useTimer } from "react-timer-hook";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const TestScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [questionNumber, setQuestionNumber] = useState(24);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 90); // 3 minutes timer

  const { seconds, minutes, isRunning, restart, pause } = useTimer({
    expiryTimestamp: time,
    onExpire: () => setQuestionNumber((prev) => prev + 1),
    autoStart: true,
  });

  const {
    increaseScore,
    decreaseScore,
    candidateScore,
    changeScreen,
    userDetails,
    questions,
  } = useStore();

  useEffect(() => {
    if (questionNumber > 0) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 90); // 3 minutes timer

      setSelectedOption("");

      restart(time, true);
    }
  }, [questionNumber, isRunning, restart]);

  const submitQuestion = useCallback(async () => {
    if (!questions) {
      // implement the toaster here

      return;
    }

    const currentOption = selectedOption;
    const question = questions[questionNumber];

    checkAnswer(question, currentOption, increaseScore, decreaseScore);

    setSelectedOption("");

    if (questionNumber === questions.length - 1) {
      const selected = isCandidateSelected(candidateScore, questions);

      if (!userDetails) {
        return;
      }

      if (selected) {
        await axios.post("/api/email/hr", { userDetails });
      } else {
        await axios.post("/api/email/user", { userDetails });
      }

      pause();

      changeScreen("chatScreen");

      return;
    }

    setQuestionNumber((prev) => prev + 1);

    const time = new Date();
    time.setSeconds(time.getSeconds() + 90); // 3 minutes timer

    restart(time, true);
  }, [
    selectedOption,
    questions,
    increaseScore,
    decreaseScore,
    questionNumber,
    restart,
    changeScreen,
    candidateScore,
    pause,
    userDetails,
  ]);

  return (
    <div className="w-full relative bg-whitesmoke overflow-hidden flex flex-col items-start justify-start pt-[4.25rem] px-[7.5rem] pb-[15.8rem] box-border gap-[8.012rem] leading-[normal] tracking-[normal] text-left text-[2.294rem] text-gray font-graphik lg:gap-[4rem] lg:pl-[3.75rem] lg:pr-[3.75rem] lg:box-border mq450:gap-[1rem] mq750:gap-[2rem] mq750:pl-[1.875rem] mq750:pr-[1.875rem] mq750:box-border">
      <div className="w-[9.688rem] flex flex-col items-start justify-start gap-[0.375rem]">
        <a className="[text-decoration:none] h-[2.5rem] relative tracking-[-0.04em] text-[inherit] inline-block mq450:text-[1.375rem] mq1050:text-[1.813rem]">
          Screen.AI
        </a>
        <div className="self-stretch flex flex-row items-start justify-end text-[0.875rem]">
          <Link
            href="https://codelinear.com"
            className="flex flex-row items-start justify-start gap-[0.125rem] cursor-pointer"
          >
            <div className="relative">by Codelinear</div>
            <Redirect />
          </Link>
        </div>
      </div>
      <div className="w-[70.813rem] flex flex-col items-start justify-start gap-[3.425rem] max-w-full text-[3rem] text-darkslategray mq750:gap-[1.688rem]">
        <h1
          style={{ userSelect: "none" }}
          className="m-0 self-stretch h-[7.25rem] relative text-inherit tracking-[-0.02em] leading-[120%] font-normal font-inherit inline-block mq450:text-[1.813rem] mq450:leading-[2.188rem] mq1050:text-[2.375rem] mq1050:leading-[2.875rem] cursor-not-allowed pointer-events-none"
        >
          {questions &&
            questions[questionNumber]?.question}
        </h1>
        <div className="flex flex-col items-start justify-start gap-[1.25rem] max-w-full text-[1.5rem] text-black">
          {questions &&
            questions[questionNumber]?.options.map((option) => (
              <div
                key={uuidv4()}
                className="flex flex-row items-start justify-start gap-[0.75rem] max-w-full"
              >
                <input
                  id={option}
                  className="cursor-pointer top-[6px] m-0 h-[1.75rem] w-[1.75rem] relative overflow-hidden shrink-0 min-h-[1.75rem]"
                  type="radio"
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label
                  htmlFor={option}
                  style={{ userSelect: "none" }}
                  className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_40px)] cursor-pointer"
                >
                  <p className="m-0 relative tracking-[-0.02em] mq450:text-[1.188rem]">
                    {option}
                  </p>
                </label>
              </div>
            ))}

          {/* <div className="flex flex-row items-start justify-start gap-[0.75rem] max-w-full">
            <input
              id="option-2"
              className="cursor-pointer m-0 h-[1.75rem] w-[1.75rem] relative overflow-hidden shrink-0 min-h-[1.75rem]"
              type="radio"
              name="options"
              value="B. Purus dictum lobortis venenatis faucibus vulputate."
              checked={
                selectedOption ===
                "B. Purus dictum lobortis venenatis faucibus vulputate."
              }
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label
              htmlFor="option-2"
              className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_40px)]"
            >
              <p className="m-0 relative tracking-[-0.02em] mq450:text-[1.188rem]">
                B. Purus dictum lobortis venenatis faucibus vulputate.
              </p>
            </label>
          </div> */}
          {/* <div className="flex flex-row items-start justify-start gap-[0.75rem] max-w-full">
            <input
              id="option-3"
              className="cursor-pointer m-0 h-[1.75rem] w-[1.75rem] relative overflow-hidden shrink-0 min-h-[1.75rem]"
              type="radio"
              name="options"
              value="C. Ultrices felis nunc congue gravida eros in. Odio."
              checked={
                selectedOption ===
                "C. Ultrices felis nunc congue gravida eros in. Odio."
              }
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label
              htmlFor="option-3"
              className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_40px)]"
            >
              <p className="m-0 relative tracking-[-0.02em] mq450:text-[1.188rem]">
                C. Ultrices felis nunc congue gravida eros in. Odio.
              </p>
            </label>
          </div> */}
          {/* <div className="flex flex-row items-start justify-start gap-[0.75rem] max-w-full">
            <input
              id="option-4"
              className="cursor-pointer m-0 h-[1.75rem] w-[1.75rem] relative overflow-hidden shrink-0 min-h-[1.75rem]"
              type="radio"
              name="options"
              value="D. Lobortis consectetur proin turpis aenean nunc in."
              checked={
                selectedOption ===
                "D. Lobortis consectetur proin turpis aenean nunc in."
              }
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label
              htmlFor="option-4"
              className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_40px)]"
            >
              <p className="m-0 relative tracking-[-0.02em] mq450:text-[1.188rem]">
                D. Lobortis consectetur proin turpis aenean nunc in.
              </p>
            </label>
          </div> */}
        </div>
      </div>
      <div className="w-[67.25rem] flex flex-row items-end justify-between max-w-full gap-[1.25rem] text-[1.5rem] text-white mq1050:flex-wrap">
        <div className="flex flex-row items-start justify-start gap-[1.775rem] max-w-full mq450:flex-wrap">
          <button
            onClick={submitQuestion}
            disabled={!selectedOption}
            className={`[backdrop-filter:blur(9.7px)] ${
              !selectedOption ? "opacity-50" : "opacity-100"
            } rounded-[51px] bg-blueviolet-200 overflow-hidden flex flex-row items-start cursor-pointer justify-start py-[2.25rem] px-[3rem]`}
          >
            <div className="relative tracking-[-0.02em] mq450:text-[1.188rem]">
              Next
            </div>
          </button>
          <div className="flex flex-col items-start justify-start pt-[2.25rem] px-[0rem] pb-[0rem] text-black">
            <div className="relative tracking-[-0.02em] font-medium mq450:text-[1.188rem]">
              {minutes}:{seconds < 10 ? "0" + seconds : seconds} remaining
            </div>
          </div>
        </div>
        <div className="w-[21.125rem] flex flex-col items-end justify-start gap-[0.925rem] max-w-full text-right text-[1rem] text-black">
          <div className="relative">
            {questionNumber + 1} / 25 Questions finished.
          </div>
          <div className="self-stretch rounded-6xl bg-white overflow-hidden flex flex-row items-start justify-start">
            <div
              style={{ width: `${(questionNumber * 100) / 25}%` }}
              className="h-[1.625rem] relative rounded-6xl [background:linear-gradient(90deg,_#ebdfff,_#afbbf5)] overflow-hidden shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestScreen;
