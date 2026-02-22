import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main(prompt) {
    try {
        console.log("AI Agent: Attempting generation with Claude...");

        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 4000,
            system: "You are a professional blog writer. Generate high-quality, insightful blog posts with clear headings and paragraphs. Tone: Thoughtful and insightful. Format: Simple text.",
            messages: [
                { role: "user", content: prompt }
            ],
        });

        if (response.content && response.content[0] && response.content[0].text) {
            return response.content[0].text;
        }

        throw new Error("Empty response from Claude");

    } catch (error) {
        console.error(`AI Agent: Claude failed: ${error.message}`);

        if (error.status === 429) {
            throw new Error("AI Quota Exhausted. Please retry in 60 seconds.");
        }

        throw new Error(`AI System Unavailable: ${error.message}`);
    }
}

export default main;
