import { NextPage } from "next";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Redirect from "./ui/redirect";
import UploadIcon from "./ui/upload";
import ArrowLeft from "./ui/arrow-left";
import Tick from "./ui/tick";
import { useStore } from "@/store";
import TestLoading from "./test-loading";
import Reload from "./ui/reload";
import axios from "axios";

const UploadResume: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [testLoading, setTestLoading] = useState<boolean>(false);
  const [fileStatus, setfileStatus] = useState<"empty" | "valid" | "invalid">(
    "empty"
  );

  const { changeScreen } = useStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onResumeSubmit = async () => {
    try {
      setTestLoading(true);

      const formData = new FormData();

      if (!file) {
        return;
      }

      // implement toaster when the file isn't there.

      formData.append("file", file);

      const res = await axios.post("/api/ai/analyse", formData);

      const isEligible = res.data.output.passed;

      setTestLoading(false);

      if (isEligible) {
        changeScreen("resumeValid");
      } else {
        changeScreen("resumeInvalidEmailCapture");
      }
    } catch (error) {
      console.error(error);
      // apply toaster here for error message
      setTestLoading(false);
      setFile(null);
      setfileStatus("empty");
    }
  };

  return true ? (
    <TestLoading />
  ) : (
    <div className="w-full relative bg-whitesmoke overflow-hidden flex flex-col items-start justify-start h-sm:pt-[2rem] h-md:pt-[4.25rem] px-[7.5rem] h-md:pb-[4rem] h-lg:pb-[12.75rem] box-border gap-[1rem] h-md:gap-[2.125rem] h-lg:gap-[7.125rem] leading-[normal] tracking-[normal] text-left text-[2.294rem] text-gray font-graphik lg:pl-[3.75rem] lg:pr-[3.75rem] lg:box-border mq450:gap-[1.75rem] mq750:gap-[3.563rem] mq750:pl-[1.875rem] mq750:pr-[1.875rem] mq750:box-border">
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="application/pdf"
        onChange={(e) => {
          const files = e.target.files;
          if (!files) {
            return;
          }

          const fileSizeInBytes = files[0].size;
          const fileSizeInKB = fileSizeInBytes / 1024;
          const fileSizeInMB = fileSizeInKB / 1024;

          if (fileSizeInMB > 2) {
            setfileStatus("invalid");
            setFile(null);
            return;
          }

          setFile(files[0]);
          setfileStatus("valid");
        }}
      />

      <div className="w-[9.688rem] flex flex-col items-end justify-start gap-[0.375rem]">
        <a className="[text-decoration:none] h-[2.5rem] text-[2rem] h-md:text-[2.294rem] relative tracking-[-0.04em] text-[inherit] inline-block mq450:text-[1.375rem] mq1050:text-[1.813rem]">
          Screen.AI
        </a>
        <div className="self-stretch flex flex-row items-start justify-end text-[0.875rem]">
          <Link
            className="flex flex-row items-center justify-start gap-[0.125rem] cursor-pointer"
            href="https://codelinear.com"
          >
            <div className="relative">by Codelinear</div>
            <Redirect />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start h-md:gap-[2rem] h-lg:gap-[6.5rem] max-w-full h-md:text-[4rem] h-lg:text-[5.125rem] text-darkslategray mq750:gap-[1.625rem] mq1050:gap-[3.25rem] ">
        <h1 className="m-0 h-[5.625rem] relative text-inherit tracking-[-0.04em] font-normal font-inherit inline-block mq450:text-[1.563rem] mq1050:text-[2.563rem]">
          Great! Send us your resume.
        </h1>
        <div className="w-[34.188rem] flex flex-col items-start justify-start gap-[3.775rem] max-w-full text-[1.5rem] text-blueviolet-200 mq450:gap-[0.938rem] mq750:gap-[1.875rem]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[1.35rem] max-w-full">
            <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[1.25rem] max-w-full">
              <div
                onClick={() => {
                  if (fileInputRef.current && fileStatus !== "valid") {
                    fileInputRef.current?.click();
                  }
                }}
                className={`w-[20rem] sm:w-[26.188rem] h-md:w-[34.188rem] cursor-pointer [backdrop-filter:blur(9.7px)] rounded-3xl bg-white flex flex-row items-start justify-center py-[3.531rem] h-md:pt-[5.531rem] px-[1.25rem] h-md:pb-[5.593rem] box-border shrink-0 [debug_commit:69da668] max-w-full ${
                  fileStatus === "invalid" && "border border-[#C71414]"
                }`}
              >
                <div className="flex flex-row items-center justify-start gap-[0.618rem] max-w-full mq450:flex-wrap">
                  <div className="flex flex-col items-start justify-start pt-[0.231rem] px-[0rem] pb-[0rem]">
                    {fileStatus === "valid" ? <Tick /> : <UploadIcon />}
                  </div>
                  <div className="h-[3.875rem] relative tracking-[-0.02em] leading-[130%] inline-block mq450:text-[1.188rem] mq450:leading-[1.563rem]">
                    {fileStatus === "valid" ? (
                      <p className="m-0">Uploaded!</p>
                    ) : (
                      <>
                        {" "}
                        <p className="m-0">Click to upload your resume</p>
                        <p className="m-0">in PDF.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {fileStatus === "valid" && (
                <div
                  className={`w-full h-[11rem] h-md:h-60 [backdrop-filter:blur(9.7px)] flex items-center justify-center rounded-3xl bg-lavender leading-[normal] tracking-[normal]`}
                >
                  <Reload />
                </div>
              )}
            </div>
            <div
              className={`relative text-[1rem] ${
                fileStatus === "empty" ? "text-darkslategray" : "text-[#C71414]"
              } ${fileStatus === "valid" && "hidden"}`}
            >
              Maximum file size: 2 MB
            </div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[1.25rem] text-white">
            <div
              onClick={() => {
                setfileStatus("empty");
                setFile(null);
                changeScreen("home");
              }}
              className="h-[4.6rem] h-md:h-[6.125rem] w-[4.6rem] cursor-pointer h-md:w-[6.25rem] [backdrop-filter:blur(9.7px)] rounded-32xl bg-lavender overflow-hidden shrink-0 flex flex-row items-center justify-center py-[2.25rem] px-[1.875rem] box-border"
            >
              <ArrowLeft />
            </div>
            <button
              disabled={fileStatus === "invalid" || fileStatus === "empty"}
              onClick={onResumeSubmit}
              className={`[backdrop-filter:blur(9.7px)] rounded-32xl ${
                fileStatus === "valid" ? "opacity-100" : "opacity-50"
              } bg-blueviolet-200 overflow-hidden flex flex-row items-start justify-start py-[1.25rem] h-md:py-[2.25rem] px-[2rem] h-md:px-[3rem]`}
            >
              <p className="relative tracking-[-0.02em] mq450:text-[1.188rem]">
                Finish
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
