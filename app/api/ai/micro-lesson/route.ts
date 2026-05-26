import { NextResponse } from "next/server";
import { createMicroLesson } from "@/lib/cortex-intelligence";
import { openRouterJson } from "@/lib/openrouter";
import type { OnboardingProfile, PhoneSignal } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { signal, profile } = (await request.json().catch(() => ({}))) as {
    signal?: PhoneSignal;
    profile?: Partial<OnboardingProfile>;
  };

  const fallbackSignal: PhoneSignal = signal || {
    source: "manual",
    appOrSite: "Instagram",
    category: "social",
    openedAt: new Date().toISOString(),
    durationSeconds: 0,
    triggerReason: "manual simulation"
  };
  const fallback = createMicroLesson(fallbackSignal, profile || {});

  const result = await openRouterJson({
    fallback: fallback as unknown as Record<string, unknown>,
    messages: [
      {
        role: "system",
        content:
          "Create a 60-120 second Cortex OS micro-lesson after a distraction signal. Return strict JSON: title, insight, action, proofPrompt, durationSeconds. It should be short, practical, non-cheesy, and directly tied to the user's goal and the app/site opened."
      },
      { role: "user", content: JSON.stringify({ signal: fallbackSignal, profile }) }
    ]
  });

  return NextResponse.json(result);
}
