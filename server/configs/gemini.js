import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

// Initialize the SDK and clean the API key
const rawApiKey = process.env.GEMINI_API_KEY || "";
const apiKey = rawApiKey.replace(/['"]+/g, '').trim();

if (!apiKey) {
  console.error("CRITICAL: GEMINI_API_KEY is missing from .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function main(prompt) {
  // Verified available models for this key:
  const modelsToTry = [
    "gemini-2.0-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-exp-1206"
  ];

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting to use model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (text) {
        console.log(`Success with model: ${modelName}`);
        return text;
      }
    } catch (error) {
      lastError = error;
      console.error(`Model ${modelName} failed: ${error.status || 'Error'}: ${error.message}`);

      // If it's a quota error (429), try the next model in the list
      if (error.message.includes("429")) {
        console.log(`Quota exceeded for ${modelName}, trying next...`);
        continue;
      }
      // Continue for 404 or other errors
    }
  }

  return `Error: All available AI models failed. (Last error: ${lastError?.message})`;
}

export default main;
