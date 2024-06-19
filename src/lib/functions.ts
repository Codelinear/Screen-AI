import { questions } from "@/constants/array";
import { Question } from "@/types";
import axios from "axios";

export const checkAnswer = (
  question: Question,
  currentOption: string,
  increaseScore: () => void,
  decreaseScore: () => void
) => {
  const isCorrect = question.answer === currentOption;

  if (isCorrect) {
    increaseScore();
  } else {
    decreaseScore();
  }
};

export const isCandidateSelected = (
  candidateScore: number,
  questions: Question[]
): boolean => {
  const totalScore = questions.length;

  const percentageScored = (candidateScore / totalScore) * 100;

  if (percentageScored >= 85) {
    return true;
  }

  return false;
};

export const sendMessage = async (message: string) => {
  const response = await axios.post("/api/ai/onboarding/chat", { message });

  return response.data.message;
};


export const getRandomSuggestions = (): string[] => {
  let suggestions: string[] = [];

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * questions.length);

    const randomQuestion = questions[randomIndex];

    if (!suggestions.includes(randomQuestion)) {
      suggestions.push(questions[randomIndex]);
    }
  }

  return suggestions;
};
