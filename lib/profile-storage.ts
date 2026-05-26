import type { OnboardingProfile } from "@/lib/types";

export const cortexProfileKey = "cortex-os:onboarding-profile";

export const defaultOnboardingProfile: OnboardingProfile = {
  identity: "custom",
  primaryGoal: "",
  currentProject: "",
  todayWin: "",
  avoidancePattern: "",
  fakeProgressPattern: "",
  proofPreference: "text",
  bestWorkWindow: "09:00 - 11:00",
  dangerWindow: "Late night phone drift",
  motivationStyle: "direct",
  energyPattern: "My best focus is before noon.",
  constraints: "Limited uninterrupted time.",
  realStakes: "",
  nonNegotiable: "Create visible proof before optional tasks.",
  preferredReward: "+70 Execution XP. Unlock one behavioral pattern.",
  consequence: "No optional tasks until proof is submitted.",
  rawIntake: "",
  distractionApps: ["Instagram", "YouTube", "X", "Reddit"],
  microLearningTopics: ["focus recovery", "decision quality", "active recall"],
  interventionPreference: "popup"
};

export function readStoredProfile(): OnboardingProfile | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(cortexProfileKey);
  if (!raw) return null;

  try {
    return { ...defaultOnboardingProfile, ...(JSON.parse(raw) as Partial<OnboardingProfile>) };
  } catch {
    return null;
  }
}

export function writeStoredProfile(profile: OnboardingProfile) {
  window.localStorage.setItem(cortexProfileKey, JSON.stringify(profile));
}
