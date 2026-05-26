import type { ScoreSet } from "@/lib/types";

export type ScoreInputs = {
  missionCompleted: boolean;
  proofQuality: number;
  focusMinutes: number;
  skippedMissions: number;
  delayMinutes: number;
  shutdownReflection: boolean;
  weeklyConsistency: number;
  recoveryLogged: boolean;
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function calculateScores(input: ScoreInputs): ScoreSet {
  return {
    execution: clamp((input.missionCompleted ? 50 : 10) + input.proofQuality * 30 + input.weeklyConsistency * 20 - input.skippedMissions * 12),
    focus: clamp(input.focusMinutes * 1.2 + (input.delayMinutes < 20 ? 18 : 0) + input.weeklyConsistency * 18),
    clarity: clamp(input.proofQuality * 34 + (input.shutdownReflection ? 24 : 0) + (input.delayMinutes < 30 ? 18 : 4)),
    discipline: clamp((input.missionCompleted ? 35 : 8) + (input.delayMinutes < 15 ? 25 : 5) + input.weeklyConsistency * 25),
    recovery: clamp((input.recoveryLogged ? 52 : 24) + (input.shutdownReflection ? 22 : 0) + Math.max(0, 26 - input.skippedMissions * 8)),
    momentum: clamp((input.missionCompleted ? 42 : 12) + input.focusMinutes * 0.55 + input.weeklyConsistency * 30 - input.delayMinutes * 0.22)
  };
}

export const demoScores = calculateScores({
  missionCompleted: true,
  proofQuality: 0.82,
  focusMinutes: 74,
  skippedMissions: 1,
  delayMinutes: 18,
  shutdownReflection: true,
  weeklyConsistency: 0.71,
  recoveryLogged: true
});
