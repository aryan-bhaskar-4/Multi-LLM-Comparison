import OpenAI from "openai";

export async function openai(messages, tokens = 100) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: messages,
    max_output_tokens: tokens,
  });

  return response.output_text;
}
