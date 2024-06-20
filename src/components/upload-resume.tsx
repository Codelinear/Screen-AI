import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
  const [progress, setProgress] = useState<number>(5);
  const [fileStatus, setfileStatus] = useState<
    | "empty"
    | "valid"
    | "notResume"
    | "exceededSize"
    | "invalid"
    | "pageExceeded"
  >("empty");

  const { changeScreen } = useStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (testLoading) {
      setProgress(5);
      timer = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 0.3 : 100));
      }, 10); // Adjust the interval time to control the speed of the slider
    } else {
      clearInterval(timer);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        setProgress(5);
      }
    };
  }, [testLoading]);

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

      if (
        "message" in res.data.output &&
        res.data.output.message === "Invalid resume"
      ) {
        setfileStatus("notResume");
        return;
      }

      const isEligible = res.data.output.passed;

      if (isEligible) {
        changeScreen("resumeValid");
      } else {
        changeScreen("resumeInvalidEmailCapture");
      }
    } catch (error: any) {
      if (
        "message" in error.response.data &&
        error.response.data.message === "pageExceeded"
      ) {
        setfileStatus("pageExceeded");
      } else {
        alert(error.response.data.message);
        setfileStatus("invalid");
      }
    } finally {
      setTestLoading(false);
      setProgress(100);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return testLoading ? (
    <TestLoading progress={progress} />
  ) : (
    <div className="w-full bg-whitesmoke flex flex-col items-start justify-start pt-24 h-sm:pt-32 pl-6 pb-10 sm:pl-14 xl:pl-28 h-md:pb-[4rem] h-lg:pb-[12.75rem] lg:pl-[3.75rem] lg:pr-[3.75rem]">
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
            setfileStatus("exceededSize");
            setFile(null);
            e.target.value = "";
            return;
          }

          setFile(files[0]);
          setfileStatus("valid");
        }}
      />

      <div className="flex flex-col items-start justify-start h-md:gap-[2rem] h-lg:gap-[6.5rem] max-w-full text-darkslategray">
        <h1 className="text-4xl tracking-tighter h-md:absolute h-md:top-[12rem] py-5">
          Great! Send us your resume.
        </h1>
        <div className="w-[34.188rem] h-md:absolute h-md:top-[18rem] flex flex-col items-start justify-start max-w-full text-blueviolet-200">
          <div className="self-stretch flex flex-col items-start justify-start gap-[1.35rem] max-w-full my-7">
            <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[1.25rem] max-w-full">
              <div
                onClick={() => {
                  if (fileInputRef.current && fileStatus !== "valid") {
                    fileInputRef.current?.click();
                  }
                }}
                className={`w-[18rem] sm:w-[20rem] cursor-pointer rounded-3xl bg-white flex flex-row items-center ${
                  fileStatus === "valid"
                    ? "justify-start pl-9"
                    : "justify-center"
                } py-[3.531rem] ${
                  fileStatus === "invalid" && "border border-[#C71414]"
                }
                  ${fileStatus === "exceededSize" && "border border-[#C71414]"}
                  ${fileStatus === "pageExceeded" && "border border-[#C71414]"}
                  ${fileStatus === "notResume" && "border border-[#C71414]"}
                }`}
              >
                <div className={`flex justify-center items-center `}>
                  <div
                    className={`"flex items-center justify-center ml-8 mr-5`}
                  >
                    {fileStatus === "valid" ? <Tick /> : <UploadIcon />}
                  </div>
                  <div className="text-[1.2rem] font-medium">
                    {fileStatus === "valid" ? (
                      <p>Uploaded!</p>
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
                  className={`w-20 py-[3.531rem] flex items-center justify-center rounded-3xl bg-lavender cursor-pointer`}
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
              {fileStatus === "exceededSize" && <>Maximum file size: 2 MB</>}
              {fileStatus === "notResume" && (
                <>
                  We couldn’t identify your resume. Please try uploading it
                  again.
                </>
              )}
              {fileStatus === "pageExceeded" && (
                <>Please upload a resume with less than 2 pages.</>
              )}
            </div>
          </div>
          <div className="flex flex-row items-start justify-start mt-4 gap-[1.25rem] text-white">
            <div
              onClick={() => {
                setfileStatus("empty");
                setFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                changeScreen("home");
              }}
              className="h-[3.68rem] w-[3.68rem] cursor-pointer rounded-full bg-lavender flex flex-row items-center justify-center p-4"
            >
              <ArrowLeft />
            </div>
            <button
              disabled={fileStatus === "invalid" || fileStatus === "empty"}
              onClick={onResumeSubmit}
              type="button"
              className={`${
                fileStatus === "valid" ? "opacity-100" : "opacity-50"
              } rounded-full bg-blueviolet-200 flex items-center justify-center py-[1.25rem] px-[2rem] text-white`}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
