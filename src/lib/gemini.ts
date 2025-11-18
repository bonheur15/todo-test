import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function rewriteTodoWithAI(text: string) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Rewrite the following todo item to be more professional, concise, and actionable. Only return the rewritten text, nothing else.
  
  Original: ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
}
