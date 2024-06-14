"use client";

import ChatScreen from "@/components/chat-screen";
import Logo from "@/components/logo";
import ResumeInvalidEmailCapture from "@/components/resume-invalid-email-capture";
import ResumeValid from "@/components/resume-valid";
import TestScreen from "@/components/test-screen";
import UploadResume from "@/components/upload-resume";
import UserDetails from "@/components/user-details";
import { useStore } from "@/store";

export default function Home() {
  const { screen } = useStore();

  if (screen === "home") {
    return (
      <>
        <Logo />
        <UserDetails />
      </>
    );
  } else if (screen === "uploadResume") {
    return (
      <>
        <Logo />
        <UploadResume />
      </>
    );
  } else if (screen === "resumeValid") {
    return (
      <>
        <Logo />
        <ResumeValid />
      </>
    );
  } else if (screen === "resumeInvalidEmailCapture") {
    return (
      <>
        <Logo />
        <ResumeInvalidEmailCapture />
      </>
    );
  } else if (screen === "testScreen") {
    return (
      <>
        <Logo />
        <TestScreen />
      </>
    );
  } else if (screen === "chatScreen") {
    return (
      <main className="h-screen w-full flex bg-[#F2F5F6] items-center xl:pl-[7.5em] pt-[4.5rem]">
        <Logo />
        <ChatScreen />
      </main>
    );
  }
}
