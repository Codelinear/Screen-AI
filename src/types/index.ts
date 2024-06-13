export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
}
