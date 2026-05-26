type JsonObject = Record<string, unknown>;

type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function openRouterJson({
  messages,
  fallback,
  model
}: {
  messages: OpenRouterMessage[];
  fallback: JsonObject;
  model?: string;
}) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return fallback;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "Cortex OS"
    },
    body: JSON.stringify({
      model: model || process.env.OPENROUTER_MODEL || process.env.OPENAI_MODEL || "openai/gpt-4o-mini",
      response_format: { type: "json_object" },
      messages
    })
  });

  if (!response.ok) {
    return fallback;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    return fallback;
  }

  try {
    return JSON.parse(content) as JsonObject;
  } catch {
    return fallback;
  }
}
