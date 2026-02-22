import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000', // Update for production
        'X-Title': 'QuickBlog',
    },
});

async function generateAIContent(prompt) {
    try {
        const completion = await openRouter.chat.send({
            chatGenerationParams: {
                model: 'google/gemini-2.0-flash-001',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            },
            stream: false,
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("OpenRouter Error:", error);
        throw error;
    }
}

export default generateAIContent;
