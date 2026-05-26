export type IdentityKey =
  | "founder"
  | "student"
  | "creator"
  | "trader"
  | "developer"
  | "designer"
  | "athlete"
  | "operator"
  | "custom";

export type ProofType = "text" | "image" | "link" | "file" | "timer" | "reflection";

export type MissionStatus = "locked" | "started" | "proof_pending" | "accepted" | "delayed" | "shrunk";

export type DailyMission = {
  title: string;
  objective: string;
  whyItMatters: string;
  avoidancePrediction: string;
  firstMove: string;
  deadline: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  timeEstimate: string;
  proofRequired: string;
  proofType: ProofType;
  fallbackVersion: string;
  reward: string;
  consequence: string;
  pressureMessage: string;
  antiDriftProtocol: string[];
  scoringSignals: string[];
  tomorrowMemorySeed: string;
  status: MissionStatus;
  identity: IdentityKey;
  contextTrace?: {
    sourceGoal: string;
    sourceProject: string;
    sourceAvoidance: string;
    sourceWindow: string;
  };
};

export type BehavioralPattern = {
  name: string;
  evidence: string;
  intervention: string;
  confidence: number;
};

export type ScoreSet = {
  execution: number;
  focus: number;
  clarity: number;
  discipline: number;
  recovery: number;
  momentum: number;
};

export type IdentitySystem = {
  key: IdentityKey;
  label: string;
  promise: string;
  missions: string[];
  supportHabits: string[];
  failurePatterns: string[];
  scoringRules: string[];
  achievements: string[];
  weeklyMilestones: string[];
  antiDistractionProtocols: string[];
};

export type OnboardingProfile = {
  identity: IdentityKey;
  customIdentity?: string;
  primaryGoal: string;
  currentProject: string;
  todayWin: string;
  avoidancePattern: string;
  fakeProgressPattern: string;
  proofPreference: ProofType;
  bestWorkWindow: string;
  dangerWindow: string;
  motivationStyle: "calm" | "direct" | "pressure" | "analytical";
  energyPattern: string;
  constraints: string;
  realStakes: string;
  nonNegotiable: string;
  preferredReward: string;
  consequence: string;
};
