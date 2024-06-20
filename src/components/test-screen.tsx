"use client";

import { useStore } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { checkAnswer, isCandidateSelected } from "@/lib/functions";
import Markdown from "react-markdown";
import { useTimer } from "react-timer-hook";
import { v4 as uuidv4 } from "uuid";
import remarkGfm from "remark-gfm";
import axios from "axios";
// import { allQuestions as questions } from "@/constants/array";

const TestScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    increaseScore,
    decreaseScore,
    candidateScore,
    changeScreen,
    userDetails,
    questions,
  } = useStore();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 90); // 3 minutes timer

  const { seconds, minutes, isRunning, restart, pause } = useTimer({
    expiryTimestamp: time,
    onExpire: async () => {
      if (questions && questionNumber === questions?.length - 1) {
        const selected = isCandidateSelected(candidateScore, questions);

        if (!userDetails) {
          return;
        }

        if (selected) {
          try {
            setSubmitLoading(true);

            await axios.post("/api/email/hr", { userDetails });

            setSubmitLoading(false);
          } catch (error) {
            setSubmitLoading(false);
          }
        } else {
          // await axios.post("/api/email/user", { userDetails });
        }

        pause();

        changeScreen("chatScreen");

        return;
      }

      setQuestionNumber((prev) => prev + 1);
    },
    autoStart: true,
  });

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
        try {
          setSubmitLoading(true);

          await axios.post("/api/email/hr", { userDetails });

          setSubmitLoading(false);
        } catch (error) {
          setSubmitLoading(false);
        }
      } else {
        // await axios.post("/api/email/user", { userDetails });
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
    <div className="w-full bg-whitesmoke flex flex-col items-start justify-start pt-24 h-sm:pt-32 h-md:pt-[14rem] pl-6 pb-9 sm:pl-14 xl:pl-28 text-[2.294rem]">
      {submitLoading && (
        <div className="absolute h-screen w-screen backdrop-blur-3xl bg-white top-0 left-0 z-50 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mx-10 animate-pulse text-[#303030]">
            Evaluating your result.
          </h1>
        </div>
      )}

      <div className="w-[70.813rem] flex flex-col items-start justify-start h-md:gap-[4rem] gap-[2rem] h-md:mb-16 mb-12 max-w-full text-darkslategray">
        <h1
          style={{ userSelect: "none" }}
          className="mr-4 text-2xl sm:text-[2rem] cursor-not-allowed pointer-events-none"
        >
          <Markdown remarkPlugins={[remarkGfm]}>
            {questions && questions[questionNumber]?.question}
          </Markdown>
        </h1>
        <div className="flex flex-col text-[1rem] items-start justify-start pr-2 sm:pr-4 gap-[1.25rem] max-w-full h-md:text-[1.5rem] text-black">
          {questions &&
            questions[questionNumber]?.options.map((option) => (
              <div
                key={uuidv4()}
                className="flex items-center justify-start gap-[0.75rem] max-w-full"
              >
                <input
                  id={option}
                  className="cursor-pointer h-md:h-[1.75rem] h-md:w-[1.75rem] h-[1rem] w-[1rem]"
                  type="radio"
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label
                  htmlFor={option}
                  style={{ userSelect: "none" }}
                  className="cursor-pointer text-[0.8rem] h-sm:text-[1.2rem] h-md:text-[1.4rem] sm:text-[1rem] lg:text-[1.4rem]"
                >
                  {option}
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="w-[83vw] 2xl:w-[75rem] flex flex-wrap items-end mr-12 justify-between max-w-full gap-[1.25rem] text-[1rem] sm:text-[1.5rem] text-white">
        <div className="flex items-center justify-start gap-[3rem] max-w-full">
          <button
            onClick={submitQuestion}
            disabled={!selectedOption}
            className={`${
              !selectedOption ? "opacity-50" : "opacity-100"
            } rounded-full bg-blueviolet-200 text-[0.9rem] h-sm:text-base cursor-pointer p-4 h-sm:py-6 h-sm:px-8`}
          >
            Next
          </button>
          <div className="flex flex-col items-start justify-start text-black">
            <div className="font-medium">
              {minutes}:{seconds < 10 ? "0" + seconds : seconds} remaining
            </div>
          </div>
        </div>
        <div className="w-[40vw] lg:w-[21.125rem] absolute lg:static text-[2rem] h-md:top-[4rem] left-[57%] flex flex-col items-end justify-start gap-[0.7rem] sm:gap-[0.925rem] max-w-full text-right text-xs sm:text-base text-black">
          <div>
            {questionNumber + 1} / {questions?.length} Questions finished.
          </div>
          <div className="self-stretch rounded-6xl bg-white overflow-hidden flex flex-row items-start justify-start duration-300">
            <div
              style={{ width: `${(questionNumber * 100) / 20}%` }}
              className="h-4 md:h-[1.625rem] transition-all duration-200 rounded-6xl [background:linear-gradient(90deg,_#ebdfff,_#afbbf5)] overflow-hidden shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestScreen;
