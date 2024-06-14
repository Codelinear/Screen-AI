"use client";

import { useStore } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { checkAnswer, isCandidateSelected } from "@/lib/functions";
import Markdown from "react-markdown";
import { useTimer } from "react-timer-hook";
import { v4 as uuidv4 } from "uuid";
import remarkGfm from 'remark-gfm'
import axios from "axios";

const TestScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);

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
    <div className="w-full relative bg-whitesmoke overflow-hidden flex flex-col items-start justify-start pt-36 px-[7.5rem] pb-[3rem] box-border text-[2.294rem]">
      {submitLoading && (
        <div className="absolute h-screen w-screen backdrop-blur-3xl bg-white top-0 left-0 z-50 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-center mx-10 animate-pulse text-[#303030]">
            Evaluating your result.
          </h1>
        </div>
      )}

      <div className="w-[70.813rem] flex flex-col items-start justify-start gap-[2rem] mb-12 max-w-full text-[2rem] h-md:text-[3rem] text-darkslategray">
        <h1
          style={{ userSelect: "none" }}
          className="m-0 self-stretch text-inherit cursor-not-allowed pointer-events-none"
        >
          <Markdown remarkPlugins={[remarkGfm]}>
            {questions && questions[questionNumber]?.question}
          </Markdown>
        </h1>
        <div className="flex flex-col text-[1rem] items-start justify-start gap-[1.25rem] max-w-full h-md:text-[1.5rem] text-black">
          {questions &&
            questions[questionNumber]?.options.map((option) => (
              <div
                key={uuidv4()}
                className="flex flex-row items-start justify-start gap-[0.75rem] max-w-full"
              >
                <input
                  id={option}
                  className="cursor-pointer m-0 h-md:h-[1.75rem] h-md:w-[1.75rem] h-[1rem] w-[1rem] min-h-[1.75rem]"
                  type="radio"
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label
                  htmlFor={option}
                  style={{ userSelect: "none" }}
                  className="flex flex-col items-start justify-start pt-[0.125rem] cursor-pointer"
                >
                  <p>{option}</p>
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="w-[67.25rem] flex flex-row items-end justify-between max-w-full gap-[1.25rem] text-[1.5rem] text-white">
        <div className="flex items-center justify-start gap-[1.775rem] max-w-full">
          <button
            onClick={submitQuestion}
            disabled={!selectedOption}
            className={`${
              !selectedOption ? "opacity-50" : "opacity-100"
            } rounded-full bg-blueviolet-200 text-base flex flex-row items-start cursor-pointer justify-start py-6 px-8`}
          >
            Next
          </button>
          <div className="flex flex-col items-start justify-start text-black">
            <div className="font-medium">
              {minutes}:{seconds < 10 ? "0" + seconds : seconds} remaining
            </div>
          </div>
        </div>
        <div className="w-[21.125rem] flex flex-col items-end justify-start gap-[0.925rem] max-w-full text-right text-base text-black">
          <div className="relative">
            {questionNumber + 1} / 25 Questions finished.
          </div>
          <div className="self-stretch rounded-6xl bg-white overflow-hidden flex flex-row items-start justify-start transition duration-300">
            <div
              style={{ width: `${(questionNumber * 100) / 25}%` }}
              className="h-[1.625rem] transition duration-300 relative rounded-6xl [background:linear-gradient(90deg,_#ebdfff,_#afbbf5)] overflow-hidden shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestScreen;
