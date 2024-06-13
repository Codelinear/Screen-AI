import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

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

    const openaiAPIKey = process.env.OPENAI_API_KEY;
    const pineconeAPIKey = process.env.PINECONE_API_KEY;
    const pineconeIndexName = process.env.PINECONE_INDEX_NAME;

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

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 300,
      chunkOverlap: 20,
    });

    const documentChunks = await splitter.splitDocuments(docs);

    const pinecone = new Pinecone({
      apiKey: pineconeAPIKey,
    });

    const pineconeIndex = pinecone.Index(pineconeIndexName);

    const embedModel = new OpenAIEmbeddings({
      apiKey: openaiAPIKey,
      modelName: "text-embedding-3-small", // 1536 dimensions
    });

    await PineconeStore.fromDocuments(documentChunks, embedModel, {
      pineconeIndex,
    });

    return NextResponse.json({ message: "Documents uploaded to Pinecone" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
