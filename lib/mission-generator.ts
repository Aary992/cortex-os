import { identitySystems } from "@/lib/identity-systems";
import type { DailyMission, IdentityKey, OnboardingProfile, ProofType } from "@/lib/types";

const defaults: Record<IdentityKey, Omit<DailyMission, "identity">> = {
  founder: {
    title: "Send 5 sharp customer emails",
    objective: "Create market contact before product comfort pulls you back.",
    whyItMatters: "You keep improving the product to avoid market feedback. Today needs evidence, not polish.",
    avoidancePrediction: "You will call it research when the real fear is rejection.",
    firstMove: "Open the customer list and pick five names before touching the product.",
    deadline: "11:00 AM",
    difficulty: 4,
    timeEstimate: "35 minutes",
    proofRequired: "Screenshot or text log of the five sent emails.",
    proofType: "image",
    fallbackVersion: "Send one imperfect email before 11:00 AM.",
    reward: "+80 Execution XP. Unlock: Sales Resistance Pattern.",
    consequence: "No product polish until one market touch exists.",
    pressureMessage: "Market truth first. Comfort later.",
    antiDriftProtocol: ["Open the customer list", "Pick five names", "Send one imperfect ask before editing the rest"],
    scoringSignals: ["Sent messages", "Response risk created", "Deadline met"],
    tomorrowMemorySeed: "If outreach was delayed, Cortex should reduce the ask and block product polish earlier.",
    status: "locked"
  },
  student: {
    title: "Run one active recall block",
    objective: "Test what you can retrieve without notes.",
    whyItMatters: "Rereading feels safe but hides weak memory. Recall exposes the truth while there is still time.",
    avoidancePrediction: "You will reorganize notes because timed recall can prove you do not know it yet.",
    firstMove: "Close the notes and write ten questions from memory.",
    deadline: "10:30 AM",
    difficulty: 3,
    timeEstimate: "30 minutes",
    proofRequired: "Photo or text of answered recall questions and marked gaps.",
    proofType: "text",
    fallbackVersion: "Answer three questions from memory in five minutes.",
    reward: "+65 Clarity XP. Unlock: Recall Baseline.",
    consequence: "No lecture videos until the recall attempt is logged.",
    pressureMessage: "Recall is the receipt. Notes are not proof.",
    antiDriftProtocol: ["Close notes", "Write questions from memory", "Mark gaps without shame"],
    scoringSignals: ["Recall answers created", "Gaps identified", "Timed attempt completed"],
    tomorrowMemorySeed: "If recall was avoided, Cortex should start with fewer questions and a stricter timer.",
    status: "locked"
  },
  creator: {
    title: "Publish one rough signal",
    objective: "Put an idea in front of the audience today.",
    whyItMatters: "Private taste does not compound. Published feedback does.",
    avoidancePrediction: "You will keep improving the hook because visible judgment is uncomfortable.",
    firstMove: "Open the draft and write the first imperfect hook in one line.",
    deadline: "2:00 PM",
    difficulty: 4,
    timeEstimate: "45 minutes",
    proofRequired: "Link to the post, video, or published test.",
    proofType: "link",
    fallbackVersion: "Publish one short text post with a single strong claim.",
    reward: "+75 Momentum XP. Unlock: Judgment Exposure.",
    consequence: "No content consumption until the publish proof is submitted.",
    pressureMessage: "Private taste does not compound.",
    antiDriftProtocol: ["Write one hook", "Publish the smallest version", "Do not check analytics before shipping"],
    scoringSignals: ["Published artifact", "Feedback surface created", "No pre-publish consumption"],
    tomorrowMemorySeed: "If publishing was delayed, Cortex should force a smaller public proof earlier.",
    status: "locked"
  },
  trader: {
    title: "Complete the rule-first session",
    objective: "Trade only after written rules and risk boundaries are visible.",
    whyItMatters: "Your edge disappears when emotion edits the plan mid-session.",
    avoidancePrediction: "You will want to act before defining invalidation.",
    firstMove: "Write max loss, setup criteria, and no-trade condition.",
    deadline: "Market open",
    difficulty: 4,
    timeEstimate: "20 minutes",
    proofRequired: "Screenshot or text of session rules plus end-of-session journal.",
    proofType: "reflection",
    fallbackVersion: "Write one no-trade rule and one max-loss rule before any action.",
    reward: "+70 Discipline XP. Unlock: Impulse Guard.",
    consequence: "If rules are absent, position size drops to zero.",
    pressureMessage: "Rules before impulse. No exceptions.",
    antiDriftProtocol: ["Write invalidation", "Set max loss", "Walk away after urge spike"],
    scoringSignals: ["Rules written", "Risk respected", "Journal completed"],
    tomorrowMemorySeed: "If rules moved mid-session, Cortex should lower allowed exposure and require pre-session proof.",
    status: "locked"
  },
  developer: {
    title: "Ship the smallest user-visible fix",
    objective: "Close one real behavior gap instead of expanding the architecture.",
    whyItMatters: "Momentum drops when ambiguity turns into research. A shipped patch restores trust.",
    avoidancePrediction: "You will refactor nearby code to delay the uncertain edge case.",
    firstMove: "Open the failing path and write the smallest reproduction note.",
    deadline: "1:00 PM",
    difficulty: 4,
    timeEstimate: "60 minutes",
    proofRequired: "Commit, PR link, test output, or screen recording of the fixed behavior.",
    proofType: "link",
    fallbackVersion: "Create the reproduction and patch one visible failure.",
    reward: "+85 Execution XP. Unlock: Ambiguity Breaker.",
    consequence: "No tooling cleanup until the behavior is verified.",
    pressureMessage: "Shipping is the only architecture users can feel.",
    antiDriftProtocol: ["Open failing path", "Write reproduction", "Patch the smallest visible behavior"],
    scoringSignals: ["Reproduction exists", "Behavior verified", "Patch linked"],
    tomorrowMemorySeed: "If debugging drifted into refactoring, Cortex should lock the scope to one user-visible failure.",
    status: "locked"
  },
  designer: {
    title: "Submit one screen for critique",
    objective: "Turn private iteration into a reviewed artifact.",
    whyItMatters: "Taste sharpens under feedback. Hidden work cannot improve the system.",
    avoidancePrediction: "You will make another variation because critique can expose the weak decision.",
    firstMove: "Export the current frame and write the exact question you need answered.",
    deadline: "3:00 PM",
    difficulty: 3,
    timeEstimate: "40 minutes",
    proofRequired: "Screenshot of the submitted frame and critique request.",
    proofType: "image",
    fallbackVersion: "Send one rough frame with one critique question.",
    reward: "+70 Clarity XP. Unlock: Critique Loop.",
    consequence: "No new visual research until critique proof exists.",
    pressureMessage: "Taste sharpens in the open.",
    antiDriftProtocol: ["Export current frame", "Ask one critique question", "Send before creating another variant"],
    scoringSignals: ["Frame submitted", "Critique requested", "Research blocked until proof"],
    tomorrowMemorySeed: "If critique was delayed, Cortex should require one rough share before reference gathering.",
    status: "locked"
  },
  athlete: {
    title: "Complete the non-negotiable training block",
    objective: "Start the session before mood gets a vote.",
    whyItMatters: "Identity is built through boring proof, not intensity spikes.",
    avoidancePrediction: "You will wait to feel ready and call it recovery.",
    firstMove: "Put on training gear and start the warmup timer.",
    deadline: "6:30 PM",
    difficulty: 3,
    timeEstimate: "50 minutes",
    proofRequired: "Timer proof, workout log, or photo of completed session.",
    proofType: "timer",
    fallbackVersion: "Complete the warmup plus one core set.",
    reward: "+70 Discipline XP. Unlock: Readiness Myth.",
    consequence: "No entertainment until the warmup is complete.",
    pressureMessage: "Readiness is negotiated by movement.",
    antiDriftProtocol: ["Put gear on", "Start warmup", "Complete one core set"],
    scoringSignals: ["Warmup started", "Session logged", "Recovery noted"],
    tomorrowMemorySeed: "If training was skipped, Cortex should begin with gear-on proof and a smaller first block.",
    status: "locked"
  },
  operator: {
    title: "Remove the highest-friction bottleneck",
    objective: "Free the system from the constraint that is quietly taxing everyone.",
    whyItMatters: "The inbox will consume the day unless the critical path is named first.",
    avoidancePrediction: "You will answer easy messages to avoid the hard escalation.",
    firstMove: "Write the bottleneck in one sentence and name the owner.",
    deadline: "12:00 PM",
    difficulty: 4,
    timeEstimate: "45 minutes",
    proofRequired: "Decision note, message screenshot, or updated process link.",
    proofType: "text",
    fallbackVersion: "Send one bottleneck-clearing message.",
    reward: "+75 Execution XP. Unlock: Critical Path Bias.",
    consequence: "No inbox clearing until the bottleneck has an owner.",
    pressureMessage: "The inbox is not the operating system.",
    antiDriftProtocol: ["Name bottleneck", "Name owner", "Send the escalation message"],
    scoringSignals: ["Bottleneck named", "Owner assigned", "Process friction reduced"],
    tomorrowMemorySeed: "If inbox work took over, Cortex should block reactive tasks until critical path proof exists.",
    status: "locked"
  },
  custom: {
    title: "Define and prove the one outcome",
    objective: "Make today count by choosing a single visible proof.",
    whyItMatters: "You are not behind. You are undefined. Definition restores force.",
    avoidancePrediction: "You will keep the task vague so it cannot be failed.",
    firstMove: "Write the exact artifact that will exist by the deadline.",
    deadline: "11:30 AM",
    difficulty: 3,
    timeEstimate: "30 minutes",
    proofRequired: "Text, image, file, or link proving the artifact exists.",
    proofType: "text",
    fallbackVersion: "Create the first ugly five-minute version.",
    reward: "+60 Momentum XP. Unlock: Definition Protocol.",
    consequence: "Optional tasks stay blocked until proof exists.",
    pressureMessage: "Undefined work is where drift hides.",
    antiDriftProtocol: ["Name the artifact", "Make the first mark", "Submit five-minute proof"],
    scoringSignals: ["Artifact defined", "Proof created", "Delay reduced"],
    tomorrowMemorySeed: "If the mission stayed vague, Cortex should force a concrete artifact before anything else.",
    status: "locked"
  }
};

const proofLabels: Record<ProofType, string> = {
  text: "A specific text log with what changed, timestamp, and artifact details.",
  image: "A screenshot or photo proving the artifact exists.",
  link: "A working link to the shipped, sent, published, or submitted artifact.",
  file: "The file or asset created during the mission.",
  timer: "A timer log plus a short note naming the completed block.",
  reflection: "A concise reflection naming the action, result, and what was avoided."
};

export function generateDailyMission(identity: IdentityKey = "custom", profile?: Partial<OnboardingProfile>): DailyMission {
  if (!profile || !profile.primaryGoal || !profile.todayWin) {
    return { ...defaults[identity], identity };
  }

  const selectedIdentity = profile.identity || identity;
  const label = profile.customIdentity || identitySystems[selectedIdentity]?.label || "Operator";
  const proofType = profile.proofPreference || "text";
  const deadline = profile.bestWorkWindow?.includes("-")
    ? profile.bestWorkWindow.split("-")[1]?.trim() || "Today"
    : profile.bestWorkWindow || "Today";
  const output = profile.todayWin.trim();
  const project = profile.currentProject?.trim() || profile.primaryGoal.trim();
  const avoidance = profile.avoidancePattern?.trim() || "keeping the work vague";
  const fakeProgress = profile.fakeProgressPattern?.trim() || "doing adjacent work that feels responsible";
  const stakes = profile.realStakes?.trim() || "the goal stays imaginary";
  const constraints = profile.constraints?.trim() || "limited time and attention";
  const nonNegotiable = profile.nonNegotiable?.trim() || "the mission must produce visible proof";
  const reward = profile.preferredReward?.trim() || "+70 Execution XP. Cortex updates your avoidance map.";
  const energy = profile.energyPattern?.trim() || "best energy is limited, so the first block matters";

  return {
    title: output.length > 54 ? output : `Create proof: ${output}`,
    objective: `Move ${project} forward with one visible outcome tied to ${profile.primaryGoal}.`,
    whyItMatters: `${label} mode only works when the day has evidence. This matters because ${project} is the current leverage point. If it stays vague, ${stakes}.`,
    avoidancePrediction: `You will likely drift by ${avoidance}. You may disguise that drift as ${fakeProgress}. Cortex is naming it before it gets expensive.`,
    firstMove: `Open the exact place where "${output}" will be created and make the first ugly mark in two minutes.`,
    deadline,
    difficulty: 3,
    timeEstimate: "30-60 minutes",
    proofRequired: proofLabels[proofType],
    proofType,
    fallbackVersion: `Create a five-minute version of "${output}" and submit imperfect proof.`,
    reward,
    consequence: profile.consequence || "Optional tasks stay blocked until proof exists.",
    pressureMessage: pressureCopy(profile.motivationStyle, {
      output,
      avoidance,
      fakeProgress,
      stakes
    }),
    antiDriftProtocol: [
      `Remove ambiguity: write the exact artifact as "${output}".`,
      `Block fake progress: no ${fakeProgress} until proof exists.`,
      `Protect energy: use ${profile.bestWorkWindow || "your best work window"} before ${profile.dangerWindow || "the danger window"} hits.`,
      `Respect constraint: ${constraints}.`,
      `Non-negotiable: ${nonNegotiable}.`
    ],
    scoringSignals: [
      "Mission started before the protected window closed",
      `Proof submitted as ${proofType}`,
      "Fake-progress loop avoided",
      "Fallback used before full skip",
      "Night review updates tomorrow's protocol"
    ],
    tomorrowMemorySeed: `Watch whether ${label} avoids "${output}" through ${avoidance} or ${fakeProgress}. Adjust tomorrow by shrinking proof, moving it into ${profile.bestWorkWindow || "the best work window"}, and blocking optional tasks earlier. Energy note: ${energy}.`,
    status: "locked",
    identity: selectedIdentity,
    contextTrace: {
      sourceGoal: profile.primaryGoal,
      sourceProject: project,
      sourceAvoidance: avoidance,
      sourceWindow: profile.bestWorkWindow || "Today"
    }
  };
}

function pressureCopy(
  style: OnboardingProfile["motivationStyle"] | undefined,
  context: { output: string; avoidance: string; fakeProgress: string; stakes: string }
) {
  if (style === "calm") {
    return `No drama. Just proof. Start "${context.output}" before ${context.avoidance} takes the wheel.`;
  }

  if (style === "pressure") {
    return `This is the point where you usually disappear into ${context.fakeProgress}. Not today. Proof before comfort.`;
  }

  if (style === "analytical") {
    return `The highest-risk variable is avoidance by ${context.avoidance}. Reduce uncertainty by producing proof for "${context.output}".`;
  }

  return `You do not need more intention. You need proof of "${context.output}" before ${context.stakes}.`;
}

export function generateBriefing(identity: IdentityKey = "custom", profile?: Partial<OnboardingProfile>) {
  const selectedIdentity = profile?.identity || identity;
  const system = identitySystems[selectedIdentity];
  const mission = generateDailyMission(selectedIdentity, profile);
  return {
    mission,
    riskZone: profile?.dangerWindow ? `Danger window: ${profile.dangerWindow}` : system.failurePatterns[0],
    bestWorkWindow: profile?.bestWorkWindow || "09:00 - 11:00",
    likelyAvoidance: mission.avoidancePrediction,
    uncomfortableTruth: mission.whyItMatters,
    exactFirstMove: mission.firstMove
  };
}
