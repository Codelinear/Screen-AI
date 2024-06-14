import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { questionSystemPrompt } from "@/lib/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    const openaiAPIKey = process.env.OPENAI_API_KEY;

    // const chatModel = new ChatGoogleGenerativeAI({
    //   temperature: 1,
    //   apiKey: process.env.GEMINI_API_KEY,
    //   model: "gemini-pro",
    // });
    const chatModel = new ChatOpenAI({
      apiKey: openaiAPIKey,
      temperature: 1,
      modelName: "gpt-4o-2024-05-13",
    });

    const resumePromptTemplate = ChatPromptTemplate.fromMessages([
      ["system", questionSystemPrompt],
      ["human", "{input}"],
    ]);

    const chain = resumePromptTemplate.pipe(chatModel);

    const res = await chain.invoke({
      input: "Generate 25 problems",
      skills: `
      - Javascript
        \n\n
      - Typescript
        \n\n
      - Node.js
        \n\n
      - React
        \n\n
      - Next.js
        \n\n
      - Tailwind CSS
        \n\n
      - Redux
        \n\n
      - Express
        \n\n
      - MongoDB
        \n\n
      `,
    });

    return NextResponse.json({
      output: JSON.parse(res.content.toString()),
      // output: res.content,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
