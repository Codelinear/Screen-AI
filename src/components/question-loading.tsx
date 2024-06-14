import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const QuestionLoading = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[50px] w-[80vw] absolute top-[150px] left-[10%] bg-[#818181] rounded-xl" />
      <div className="space-y-5 absolute top-[245px] h-md:top-[360px] left-[10%] w-[65vw]">
        <Skeleton className="h-10 bg-[#818181] w-full" />
        <Skeleton className="h-10 bg-[#818181] w-full" />
        <Skeleton className="h-10 bg-[#818181] w-full" />
        <Skeleton className="h-10 bg-[#818181] w-full" />
      </div>
    </div>
  );
};

export default QuestionLoading;
