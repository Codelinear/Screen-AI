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
    return <UserDetails />;
  } else if (screen === "uploadResume") {
    return <UploadResume />;
  } else if (screen === "resumeValid") {
    return <ResumeValid />;
  } else if (screen === "resumeInvalidEmailCapture") {
    return <ResumeInvalidEmailCapture />;
  } else if (screen === "testScreen") {
    return <TestScreen />;
  } else if (screen === "chatScreen") {
    return (
      <main className="h-screen w-full flex bg-[#F2F5F6] items-center justify-center xl:px-40 py-28">
        <Logo />
        <ChatScreen />
      </main>
    );
  }
}
