import { NextResponse } from "next/server";
import { generateDailyMission } from "@/lib/mission-generator";
import { openRouterJson } from "@/lib/openrouter";
import type { IdentityKey, OnboardingProfile } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { identity = "custom", memory = [], profile } = (await request.json().catch(() => ({}))) as {
    identity?: IdentityKey;
    memory?: string[];
    profile?: Partial<OnboardingProfile>;
  };

  const fallback = generateDailyMission(profile?.identity || identity, profile);
  const result = await openRouterJson({
    fallback: fallback as unknown as Record<string, unknown>,
    messages: [
      {
        role: "system",
        content:
          "You are Cortex OS, an adaptive execution system. Generate one Daily Lock-On as strict JSON with title, objective, whyItMatters, avoidancePrediction, firstMove, deadline, difficulty, timeEstimate, proofRequired, proofType, fallbackVersion, reward, consequence, pressureMessage, antiDriftProtocol array, scoringSignals array, tomorrowMemorySeed, status, identity, contextTrace. Use the user's intake answers, behavioral memory, stakes, constraints, energy, and fake-progress pattern. Do not invent unrelated tasks. Do not sound motivational. Sound precise, direct, and useful."
      },
      {
        role: "user",
        content: JSON.stringify({ identity, profile, behavioralMemory: memory })
      }
    ]
  });

  return NextResponse.json(result);
}
