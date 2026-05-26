import { NextResponse } from "next/server";
import { behavioralPatterns } from "@/lib/behavioral-memory";
import { openRouterJson } from "@/lib/openrouter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const review = await request.json().catch(() => ({}));

  const fallback = {
    learned: "Cortex learned that delay rises when the mission remains vague.",
    tomorrowProtocol: "Define proof before opening optional tasks.",
    patterns: behavioralPatterns
  };
  const result = await openRouterJson({
    fallback,
    messages: [
      {
        role: "system",
        content:
          "Convert a Cortex OS night review into behavioral memory. Return JSON with learned, tomorrowProtocol, patterns array containing name, evidence, intervention, confidence, scoreAdjustments, tomorrowRisk, strongestSignal, weakestSignal. Be candid and specific."
      },
      { role: "user", content: JSON.stringify(review) }
    ]
  });

  return NextResponse.json(result);
}
