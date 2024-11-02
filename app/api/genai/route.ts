import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log("Request Body:", reqBody);
    const prompt = reqBody.data.prompt;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const streamingResponse = await model.generateContentStream(prompt);

    return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
  } catch (error) {
    console.error("Error generating content:", error);
    return new NextResponse("Error generating content", { status: 500 });
  }
}
