import dotenv from "dotenv";
dotenv.config();
import { anthropic } from "./anthropic/index.js";
import { gemini } from "./gemini/index.js";
import { openai } from "./openai/index.js";

async function main() {
  let messages = [
    {
      role: "user",
      content: "What is AI?",
    },
  ];

  const [output_Anthropic, output_Gemini] = await Promise.all([
    anthropic(messages),
    gemini(messages),
  ]);

  messages = [];

  // Evaluation prompt
  const evaluationPrompt = `
        You are an expert content writer evaluating competitive text models.
        The user's current request is: "${messages}"

        There separate engines returned these outputs:
        [RESPONSE OPTION OpenAI]:
        ${output_Gemini}

        [RESPONSE OPTION Anthropic]:
        ${output_Anthropic}

        Task: Write a blog post based on the user's request and the outputs of the separate engines.
    `;

  // Setting up chat history alignment for the Responses API
  const selectBestResponseMessage = [
    {
      role: "system",
      content: "You are an objective judge assessing text quality.",
    },
    {
      role: "user",
      content: evaluationPrompt,
    },
  ];
  const finalResult = await openai(selectBestResponseMessage, 400);
  console.log(`finalResult: ${finalResult}`);
}

main();
