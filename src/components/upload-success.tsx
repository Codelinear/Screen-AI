import React from "react";
import ReloadComponent from "./ui/reload-component";
import Tick from "./ui/tick";

const UploadSuccess = () => {
  return (
    <div className="w-[34.188rem] overflow-hidden flex flex-row flex-wrap items-start justify-start gap-[1.25rem] max-w-full text-blueviolet">
      <div className="w-[25.125rem] [backdrop-filter:blur(9.7px)] rounded-3xl bg-white flex flex-row items-start justify-center pt-[5.762rem] px-[1.25rem] pb-[5.818rem] box-border max-w-full">
        <div className="flex flex-row items-start justify-start gap-[0.618rem]">
          <Tick />
          <div className="flex flex-col items-start justify-start pt-[0.737rem] px-[0rem] pb-[0rem]">
            <div className="relative tracking-[-0.02em] leading-[130%] mq450:text-[1.188rem] mq450:leading-[1.563rem]">
              Uploaded!
            </div>
          </div>
        </div>
      </div>
      <ReloadComponent />
    </div>
  );
};

export default UploadSuccess;
