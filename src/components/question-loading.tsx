import React, { useEffect, useState } from "react";

const QuestionLoading = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute h-screen w-screen backdrop-blur-3xl bg-white top-0 left-0 z-50 flex items-center justify-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mx-10 animate-pulse text-[#303030]">
        Preparing your test. Please wait {seconds >= 0 ? seconds : "0"}s
      </h1>
    </div>
  );
};

export default QuestionLoading;
