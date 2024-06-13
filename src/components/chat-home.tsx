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
      setPromptSuggestions(getRandomSuggestions());
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

      const res = await fetch("/api/ai/ask", {
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
    <div className="h-full w-full flex flex-col justify-between">
      <div>
        <p className="w-[60%] text-[#30303080] text-xl lg:text-2xl">
          Thanks a lot for spending your time with us.
        </p>
        <p className="text-xl text-[#303030] lg:text-2xl w-[60%]">
          Give us up to 48 hours for an update regarding your onboarding.
        </p>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5sxl lg:text-6sxl w-3/4 max-[420px]:w-full max-[420px]:text-center md:w-1/2 flex flex-col justify-between font-bold text-[#303030]">
        Meanwhile, you can learn about our company.
      </h1>
      <div className="w-full mb-10 flex justify-between overflow-x-scroll scrollbar-hide">
        {promptSuggestions.map((prompt) => (
          <div
            key={uuidv4()}
            className={`p-4 min-w-96 max-w-[28rem] h-32 cursor-pointer rounded-xl bg-white mx-3`}
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
