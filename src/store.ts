import { create } from "zustand";
import { Question } from "@/types";
import { userDetailsSchema } from "./lib/validator";
import { z } from "zod";

type Screens =
  | "home"
  | "uploadResume"
  | "resumeValid"
  | "resumeInvalidEmailCapture"
  | "testLoading"
  | "testScreen"
  | "chatScreen";

interface AppState {
  questions: Question[] | null;
  screen: Screens;
  chatStatus: "startChat" | "chatting" | "returnChat";
  candidateScore: number;
  responseLoading: boolean;
  userDetails: z.infer<typeof userDetailsSchema> | undefined;
  setResponseLoading: (loading: boolean) => void;
  setQuestions: (Questions: Question[]) => void;
  increaseScore: () => void;
  decreaseScore: () => void;
  changeScreen: (screen: Screens) => void;
  setChatStatus: (chatStatus: "startChat" | "chatting" | "returnChat") => void;
  setUserDetails: (details: z.infer<typeof userDetailsSchema>) => void;
}

export const useStore = create<AppState>((set) => ({
  questions: null,
  screen: "home",
  candidateScore: 0,
  responseLoading: false,
  chatStatus: "startChat",
  userDetails: undefined,
  setResponseLoading: (loading) => set(() => ({ responseLoading: loading })),
  setQuestions: (questions) => set(() => ({ questions })),
  increaseScore: () =>
    set((state) => ({ candidateScore: state.candidateScore + 5 })),
  decreaseScore: () =>
    set((state) => ({ candidateScore: state.candidateScore + 0 })),
  changeScreen: (screen) => set(() => ({ screen })),
  setChatStatus: (chatStatus: "startChat" | "chatting" | "returnChat") =>
    set(() => ({ chatStatus })),
  setUserDetails: (details) => set(() => ({ userDetails: details })),
}));
