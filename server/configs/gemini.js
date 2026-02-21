import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: 'v1'
});

async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    if (error.message.includes('404')) {
      // Fallback if gemini-2.0-flash is not found (unlikely in 2026)
      const fallback = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });
      return fallback.text;
    }
    throw error;
  }
}

export default main;