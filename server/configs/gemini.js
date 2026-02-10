import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function main(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (error.status === 429) {
      console.error("Gemini API Error: Quota exhausted for 2.0. Switched to 1.5.");
      return "Error: AI rate limit exceeded. Please wait a moment.";
    }
    console.error("Gemini Error:", error.message);
    return "An error occurred while generating content.";
  }
}

export default main;