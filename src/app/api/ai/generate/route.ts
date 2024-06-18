import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { questionSystemPrompt } from "@/lib/prompts";

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
      input: "Generate 20 problems",
      skills: `
      - Javascript
        \n\n
      - CSS
        \n\n
      - Node.js
        \n\n
      - React
        \n\n
      - HTML
        \n\n
      - Tailwind CSS
        \n\n
      - Redux
        \n\n
      - Express
        \n\n
      - MongoDB
      `,
    });

    console.log(res.content)

    return NextResponse.json({
      output: JSON.parse(res.content.toString()),
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
