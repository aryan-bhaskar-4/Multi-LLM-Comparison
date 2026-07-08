import { GoogleGenAI } from "@google/genai";

export async function gemini(messages) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const interaction = await ai.interactions.create({
    model: "gemini-2.5-pro",
    input: messages,
    config: {
      maxOutputTokens: 100,
    },
  });

  return interaction.output_text;
}
