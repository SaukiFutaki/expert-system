"use server"

import { ChatOpenAI } from "@langchain/openai"

const chatModel = new ChatOpenAI(
        
    { apiKey: process.env.OPENAI_KEY_DEMO });


export async function generateRequest(prompt: string) {
    
    prompt = `berikan hal keren terkait + ${prompt} = `;
    const response = await chatModel.invoke(prompt);
    console.log("response" + response.text);
    return response.text;
}