import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(prompt) {
  // Enhanced prompt for professional output
  const enhancedPrompt = `User Request: ${prompt}\n\nPlease generate a high-quality, professional blog post based on the above request. Structure the content with clear headings and paragraphs. Tone: Thoughtful and insightful. Format: Simple text.`;

  const models = [
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash-8b",
    "gemini-2.0-flash-exp",
    "gemini-2.0-flash-lite-preview-02-05",
    "gemini-1.5-pro",
    "gemini-1.0-pro",
    "gemini-pro",
    "gemini-pro-latest"
  ];

  for (const modelName of models) {
    try {
      console.log(`AI Agent: Attempting generation with ${modelName}...`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
      });

      // Handle different response structures gracefully
      if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return response.candidates[0].content.parts[0].text;
      }
      if (typeof response.text === 'function') return await response.text();
      if (response.text) return response.text;

    } catch (error) {
      console.error(`AI Agent: Model ${modelName} failed: ${error.message}`);

      // Wait 1 second before trying the next model to avoid hitting rate limits too fast
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Continue to next model if this one fails
      if (modelName === models[models.length - 1]) {
        if (error.message?.includes('429')) {
          throw new Error("AI Quota Exhausted. Please retry in 60 seconds.");
        }
        throw new Error(`AI System Unavailable: ${error.message}`);
      }
    }
  }
}

export default main;