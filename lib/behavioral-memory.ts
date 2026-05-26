import type { BehavioralPattern } from "@/lib/types";

export const behavioralPatterns: BehavioralPattern[] = [
  {
    name: "Judgment Avoidance",
    evidence: "Tasks with external feedback are delayed 2.4x longer than private work.",
    intervention: "Shrink public proof to one ugly version and submit before refinement.",
    confidence: 86
  },
  {
    name: "Undefined Morning Drift",
    evidence: "Focus drops when the first task lacks a visible artifact.",
    intervention: "Cortex must define the proof artifact before optional tasks unlock.",
    confidence: 79
  },
  {
    name: "Research Disguise",
    evidence: "Reading blocks often replace outreach, publishing, or shipping.",
    intervention: "Research is capped until one market-facing proof exists.",
    confidence: 72
  }
];

export function antiProcrastinationProtocol(reason: string) {
  return {
    message: `You are avoiding this because ${reason || "the output can be judged"}. New mission: create one imperfect proof in 7 minutes.`,
    shrink: "Do the smallest visible version.",
    resetAction: "Stand up, clear the surface, open only the proof tool.",
    blocked: "Optional tasks stay blocked until the mission starts.",
    environment: "Move the phone out of reach and switch to a single-window workspace."
  };
}
