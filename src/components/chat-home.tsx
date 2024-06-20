import React, { useCallback, useEffect, useState } from "react";
import QuestionMark from "./ui/question-mark";
import { useStore } from "@/store";
import { v4 as uuidv4 } from "uuid";
import { getRandomSuggestions } from "@/lib/functions";

const ChatHome = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const chatStatus = useStore((state) => state.chatStatus);
  //   const userName = useStore((state) => state.userName);
  const setChatStatus = useStore((state) => state.setChatStatus);
  const setResponseLoading = useStore((state) => state.setResponseLoading);

  const [promptSuggestions, setPromptSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (chatStatus !== "chatting") {
      setPromptSuggestions(getRandomSuggestions().slice(0, 2));
    }
  }, [chatStatus]);

  const onPromptClick = useCallback(
    async (prompt: string) => {
      if (chatStatus !== "chatting") {
        setChatStatus("chatting");
      }

      const humanMessage = {
        id: uuidv4(),
        type: "user",
        content: prompt,
      };

      setMessages((prev) => [...prev, humanMessage]);

      setResponseLoading(true);

      const res = await fetch("/api/ai/onboarding/chat", {
        method: "POST",
        body: JSON.stringify({ message: prompt }),
      });

      const data = await res.json();

      setResponseLoading(false);

      setMessages((prev) => [...prev, data.message]);
    },

    [chatStatus, setChatStatus, setMessages, setResponseLoading]
  );

  return (
    <div className="h-full w-full flex flex-col justify-end">
      <div className="min-[800px]:pt-5">
        <p className="w-[60%] text-[#30303080] text-[0.8rem] xl:text-[1.5rem] xl:leading-[2rem] min-[500px]:text-base">
          Thanks a lot for spending your time with us.
        </p>
        <p className="text-[0.8rem] lg:text-[1.2rem] xl:text-[1.5rem] xl:leading-[2rem] min-[500px]:text-base text-[#303030] w-[60%]">
          Give us up to 48 hours for an update regarding your onboarding.
        </p>
      </div>
      <h1 className="text-[1.5rem] my-[1.5rem] h-md:my-[4rem] h-sm:my-[2rem] sm:text-[2rem] h-md:text-[3.5rem] lg:text-[2.5rem] xl:text-[3.5rem] w-3/4 tracking-tight md:w-3/4 h-md:w-[90%] flex flex-col justify-between text-[#303030]">
        Meanwhile, you can learn about our company.
      </h1>
      <div className="w-full mb-10 flex justify-between">
        {promptSuggestions.map((prompt, index) => (
          <div
            key={uuidv4()}
            className={`p-4 w-full ${index === 0 ? "" : "hidden sm:block ml-6"} h-32 cursor-pointer rounded-xl bg-white `}
            onClick={() => onPromptClick(prompt)}
          >
            <div className="bg-[#EBDFFF] mb-2 rounded-full h-9 w-9 flex items-center justify-center">
              <QuestionMark />
            </div>
            <p className="font-semibold text-base h-12 overflow-y-scroll scrollbar-hide text-start">
              {prompt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHome;
