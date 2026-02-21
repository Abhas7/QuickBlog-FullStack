import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(prompt) {
  const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-flash-8b"];

  for (const modelName of models) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      // If it's a quota error (429) or model not found (404), try the next model
      if (error.message.includes('429') || error.message.includes('404')) {
        console.warn(`Model ${modelName} failed, trying next...`);
        continue;
      }
      throw error;
    }
  }
  throw new Error("All Gemini models exhausted or quota exceeded.");
}

export default main;