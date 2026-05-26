import { NextResponse } from "next/server";
import { interpretProfileLocally } from "@/lib/cortex-intelligence";
import { openRouterJson } from "@/lib/openrouter";
import type { OnboardingProfile } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { intake = "" } = (await request.json().catch(() => ({}))) as { intake?: string };
  const fallback = interpretProfileLocally(intake);

  const result = await openRouterJson({
    fallback: fallback as unknown as Record<string, unknown>,
    messages: [
      {
        role: "system",
        content:
          "You are Cortex OS interpreting a messy user intake into a behavioral operating profile. Return strict JSON matching: identity, customIdentity, primaryGoal, currentProject, todayWin, avoidancePattern, fakeProgressPattern, proofPreference, bestWorkWindow, dangerWindow, motivationStyle, energyPattern, constraints, realStakes, nonNegotiable, preferredReward, consequence, rawIntake, distractionApps array, microLearningTopics array, interventionPreference. Infer intelligently. Do not ask follow-up questions. Make it practical and specific."
      },
      {
        role: "user",
        content: intake
      }
    ]
  });

  return NextResponse.json({ ...fallback, ...(result as Partial<OnboardingProfile>), rawIntake: intake });
}
