import Anthropic from "@anthropic-ai/sdk";

export async function anthropic(messages) {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const msg = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 100,
    messages: messages,
  });

  return msg.content[0].text;
}
