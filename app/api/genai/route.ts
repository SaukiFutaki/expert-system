import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClientServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const reqBody = await req.json();
    console.log("Request Body:", reqBody);
    
    // Extract all required fields
    const { 
      data: { prompt },
      tipeRumah, 
      jenisLantai, 
      jenisAtap, 
      jenisMaterial 
    } = reqBody;

    // Initialize Supabase client
    const supabase = await createClientServer();
    
    // Get authenticated user
    const { data: userData, error: authError } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (authError || !userData?.user) {
      console.error("User authentication error:", authError);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const streamingResponse = await model.generateContentStream(prompt);

    // Convert stream to text for saving to database
    let promptResult = '';
    for await (const chunk of streamingResponse.stream) {
      promptResult += chunk.text();
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("construction_analysis")
      .insert([
        {
          user_id: userId,
          tipeRumah,
          jenisLantai,
          jenisAtap,
          jenisMaterial,
          prompt_result: promptResult,
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Error saving data", details: error.message },
        { status: 500 }
      );
    }

    // Generate a new stream for the response since we consumed the original
    const newResponse = await model.generateContentStream(prompt);
    return new StreamingTextResponse(GoogleGenerativeAIStream(newResponse));

  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "Error processing request", details: error },
      { status: 500 }
    );
  }
}