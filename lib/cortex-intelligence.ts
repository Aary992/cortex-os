import type { IdentityKey, MicroLesson, OnboardingProfile, PhoneSignal, ProofType } from "@/lib/types";

const identityWords: Array<[IdentityKey, string[]]> = [
  ["student", ["exam", "study", "college", "school", "revision", "lecture"]],
  ["founder", ["startup", "customer", "sales", "revenue", "product", "users"]],
  ["creator", ["content", "youtube", "reel", "post", "audience", "creator"]],
  ["developer", ["code", "ship", "bug", "developer", "app", "software"]],
  ["designer", ["design", "portfolio", "figma", "case study", "visual"]],
  ["trader", ["trade", "market", "chart", "risk", "session"]],
  ["athlete", ["training", "fitness", "gym", "sport", "run"]],
  ["operator", ["operations", "team", "process", "pipeline", "ops"]]
];

const proofWords: Array<[ProofType, string[]]> = [
  ["link", ["publish", "post", "ship", "deploy", "send"]],
  ["image", ["screenshot", "photo", "design", "chart"]],
  ["timer", ["focus", "study", "train", "session"]],
  ["file", ["document", "deck", "file", "pdf"]],
  ["reflection", ["journal", "review", "emotional", "discipline"]]
];

export function interpretProfileLocally(raw: string): OnboardingProfile {
  const text = raw.toLowerCase();
  const identity = identityWords.find(([, words]) => words.some((word) => text.includes(word)))?.[0] || "custom";
  const proofPreference = proofWords.find(([, words]) => words.some((word) => text.includes(word)))?.[0] || "text";
  const distractions = ["Instagram", "YouTube", "X", "Reddit", "WhatsApp", "Netflix", "TradingView"].filter((app) => text.includes(app.toLowerCase()));

  return {
    identity,
    customIdentity: identity === "custom" ? "Self-directed operator" : undefined,
    primaryGoal: sentenceFrom(raw, ["goal", "want", "trying"], "Make the important project real in the next 30 days."),
    currentProject: sentenceFrom(raw, ["project", "working"], "The current highest-leverage project."),
    todayWin: sentenceFrom(raw, ["today", "proof", "finish"], "Create one visible proof artifact today."),
    avoidancePattern: sentenceFrom(raw, ["avoid", "delay", "procrastinate"], "I drift into easier work when the task can be judged."),
    fakeProgressPattern: sentenceFrom(raw, ["scroll", "research", "plan", "watch"], "I call research or planning progress when I am avoiding proof."),
    proofPreference,
    bestWorkWindow: "09:00 - 11:00",
    dangerWindow: "late night and after low-energy moments",
    motivationStyle: text.includes("harsh") || text.includes("strict") ? "pressure" : "direct",
    energyPattern: "Best focus comes before social media or passive browsing starts.",
    constraints: "Limited attention and easy access to distracting apps.",
    realStakes: sentenceFrom(raw, ["if i don't", "if this", "stakes"], "The goal stays imaginary and drift becomes the default identity."),
    nonNegotiable: "Create proof before opening high-distraction apps.",
    preferredReward: "+70 Execution XP and one unlocked behavioral pattern.",
    consequence: "Cortex interrupts distraction until a micro-action is completed.",
    rawIntake: raw,
    distractionApps: distractions.length ? distractions : ["Instagram", "YouTube", "X", "Reddit"],
    microLearningTopics: ["focus recovery", "urge surfing", "proof-based execution"],
    interventionPreference: "popup"
  };
}

export function createMicroLesson(signal: PhoneSignal, profile: Partial<OnboardingProfile>): MicroLesson {
  const app = signal.appOrSite;
  const topic = profile.microLearningTopics?.[0] || "focus recovery";

  return {
    title: `${topic}: the 60-second redirect`,
    insight: `Opening ${app} is not the failure. Staying there unconsciously is the loop. Cortex only needs one conscious interruption to weaken the pattern.`,
    action: `Before continuing ${app}, write the next visible proof step for ${profile.todayWin || "today's mission"}.`,
    proofPrompt: "Submit one sentence: what did you almost avoid, and what is the next physical action?",
    durationSeconds: 60
  };
}

function sentenceFrom(raw: string, anchors: string[], fallback: string) {
  const sentences = raw
    .split(/[.!?\n]/)
    .map((part) => part.trim())
    .filter(Boolean);
  return sentences.find((sentence) => anchors.some((anchor) => sentence.toLowerCase().includes(anchor))) || fallback;
}
