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

  return testLoading ? (
    <TestLoading />
  ) : (
    <div className="w-full bg-whitesmoke flex flex-col items-start justify-start pt-32 pl-6 md:pb-0 pb-10 sm:pl-14 xl:pl-28 h-md:pb-[4rem] h-lg:pb-[12.75rem] lg:pl-[3.75rem] lg:pr-[3.75rem]">
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="application/pdf"
        onChange={(e) => {
          const files = e.target.files;
          if (!files) {
            console.log("file not there");

            return;
          }

          const fileSizeInBytes = files[0].size;
          const fileSizeInKB = fileSizeInBytes / 1024;
          const fileSizeInMB = fileSizeInKB / 1024;

          if (fileSizeInMB > 2) {
            setfileStatus("invalid");
            setFile(null);
            e.target.value = "";
            return;
          }

          setFile(files[0]);
          setfileStatus("valid");
        }}
      />

      <div className="flex flex-col items-start justify-start h-md:gap-[2rem] h-lg:gap-[6.5rem] max-w-full h-md:text-[4rem] h-lg:text-[5.125rem] text-darkslategray">
        <h1 className="text-[1.6rem] text-[2.294]">
          Great! Send us your resume.
        </h1>
        <div className="w-[34.188rem] flex flex-col items-start justify-start max-w-full text-[1.5rem] text-blueviolet-200">
          <div className="self-stretch flex flex-col items-start justify-start gap-[1.35rem] max-w-full my-7">
            <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[1.25rem] max-w-full">
              <div
                onClick={() => {
                  if (fileInputRef.current && fileStatus !== "valid") {
                    fileInputRef.current?.click();
                  }
                }}
                className={`w-[20rem] cursor-pointer rounded-3xl bg-white flex flex-row items-start justify-center py-[3.531rem] h-md:pt-[5.531rem] px-[1.25rem] h-md:pb-[5.593rem] box-border shrink-0 max-w-full ${
                  fileStatus === "invalid" && "border border-[#C71414]"
                }`}
              >
                <div className="flex flex-row items-center justify-start max-w-full">
                  <div
                    className={`"flex items-center justify-center pt-[0.231rem] mr-5 ${
                      fileStatus === "valid" ? "pb-0" : "pb-4"
                    }`}
                  >
                    {fileStatus === "valid" ? <Tick /> : <UploadIcon />}
                  </div>
                  <div className="text-[1.2rem]">
                    {fileStatus === "valid" ? (
                      <p className="m-0">Uploaded!</p>
                    ) : (
                      <>
                        {" "}
                        <p>Click to upload your resume in PDF.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {fileStatus === "valid" && (
                <div
                  className={`w-full h-[11rem] h-md:h-60 flex items-center justify-center rounded-3xl bg-lavender cursor-pointer leading-[normal] tracking-[normal]`}
                  onClick={() => {
                    setfileStatus("empty");
                    setFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
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
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
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
