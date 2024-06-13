import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { v4 as uuidv4 } from "uuid";
import { onboardingSystemPrompt } from "@/lib/prompts";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    const { message } = await req.json();

    const openaiAPIKey = process.env.OPENAI_API_KEY;
    const pineconeAPIKey = process.env.PINECONE_API_KEY;
    const pineconeIndexName = process.env.PINECONE_INDEX_NAME;
    const environment = process.env.ENVIRONMENT;

    if (!openaiAPIKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not set" },
        { status: 401 }
      );
    }

    if (!pineconeAPIKey) {
      return NextResponse.json(
        { error: "Pinecone API key is not set" },
        { status: 401 }
      );
    }

    if (!pineconeIndexName) {
      return NextResponse.json(
        { error: "Pinecone Index Name is not set" },
        { status: 401 }
      );
    }

    const pinecone = new Pinecone({
      apiKey: pineconeAPIKey,
    });

    const pineconeIndex = pinecone.Index(pineconeIndexName);

    let embedModel;
    let chatModel;

    if (environment === "production") {
      embedModel = new OpenAIEmbeddings({
        apiKey: openaiAPIKey,
        model: "text-embedding-3-small", // 1536 dimensions
      });

      chatModel = new ChatOpenAI({
        temperature: 0,
        apiKey: openaiAPIKey,
        model: "gpt-3.5-turbo-0125",
      });
    } else {
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(
          { error: "Gemini API key is not set" },
          { status: 401 }
        );
      }

      embedModel = new GoogleGenerativeAIEmbeddings({
        model: "embedding-001", // 768 dimensions
        apiKey: process.env.GEMINI_API_KEY,
      });

      chatModel = new ChatGoogleGenerativeAI({
        temperature: 0,
        apiKey: process.env.GEMINI_API_KEY,
        model: "gemini-pro",
      });
    }

    const vectorStore = await PineconeStore.fromExistingIndex(embedModel, {
      pineconeIndex,
    });

    const qaPromptTemplate = ChatPromptTemplate.fromMessages([
      ["system", onboardingSystemPrompt],
      ["human", "{input}"],
    ]);

    const questionAnswerChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt: qaPromptTemplate,
    });

    const retriever = vectorStore.asRetriever();

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: questionAnswerChain,
      retriever,
    });

    const response = await retrievalChain.invoke({
      input: message,
    });

    return NextResponse.json(
      {
        message: {
          id: uuidv4(),
          type: "ai",
          content: response.answer,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
