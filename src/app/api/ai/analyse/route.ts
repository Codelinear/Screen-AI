import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { analyseSystemPrompt } from "@/lib/prompts";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await (file as File).arrayBuffer());

    const blob = new Blob([buffer], { type: "application/pdf" });

    const loader = new WebPDFLoader(blob, { splitPages: false });

    const docs = await loader.load();

    if (docs[0].metadata.pdf.totalPages > 2) {
      return NextResponse.json(
        { message: "pageExceeded" },
        { status: 400 }
      );
    }

    const openaiAPIKey = process.env.OPENAI_API_KEY;

    //   const chatModel = new ChatGoogleGenerativeAI({
    //     temperature: 0,
    //     apiKey: process.env.GEMINI_API_KEY,
    //     model: "gemini-pro",
    //   });
    const chatModel = new ChatOpenAI({
      apiKey: openaiAPIKey,
      temperature: 0,
      modelName: "gpt-3.5-turbo-0125",
    });

    const analysePromptTemplate = ChatPromptTemplate.fromMessages([
      ["system", analyseSystemPrompt],
      ["human", "{input}"],
    ]);

    const chain = analysePromptTemplate.pipe(chatModel);

    const res = await chain.invoke({
      input: `Here is my resume: \n\n${docs[0].pageContent}`,
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

    return NextResponse.json({
      output: JSON.parse(res.content.toString()),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
