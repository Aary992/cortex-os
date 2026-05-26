import type { IdentityKey, IdentitySystem } from "@/lib/types";

export const identitySystems: Record<IdentityKey, IdentitySystem> = {
  founder: {
    key: "founder",
    label: "Founder",
    promise: "Market contact before product comfort.",
    missions: ["Customer discovery", "Sales outreach", "Deep build block", "Decision log", "Investor narrative"],
    supportHabits: ["Pipeline review", "Decision capture", "Energy audit"],
    failurePatterns: ["Mistakes polishing for progress", "Avoids rejection loops", "Confuses strategy with contact"],
    scoringRules: ["Proof must touch market", "Shipping beats speculation", "Revenue signals weigh highest"],
    achievements: ["First Rejection Logged", "Five Founder Calls", "Market Proof Streak"],
    weeklyMilestones: ["10 customer touches", "1 shipped artifact", "1 hard decision reviewed"],
    antiDistractionProtocols: ["Open CRM first", "Send one ugly ask", "Block product polish until outreach starts"]
  },
  student: {
    key: "student",
    label: "Student",
    promise: "Recall before rereading.",
    missions: ["Active recall", "Lecture review", "Problem set sprint", "Exam prep", "Reading block"],
    supportHabits: ["Sleep review", "Spaced repetition", "Error notebook"],
    failurePatterns: ["Rereads to feel productive", "Starts with easy admin", "Avoids timed testing"],
    scoringRules: ["Recall proof outranks notes", "Timed attempts count more", "Sleep affects recovery"],
    achievements: ["Recall Streak", "Error Log Builder", "Exam Pressure Proof"],
    weeklyMilestones: ["4 recall sessions", "2 practice tests", "1 weak unit repaired"],
    antiDistractionProtocols: ["Open blank page", "Write 5 remembered facts", "Phone outside room"]
  },
  creator: {
    key: "creator",
    label: "Creator",
    promise: "Published proof before private taste.",
    missions: ["Hook testing", "Filming block", "Publishing cadence", "Idea capture", "Audience reply loop"],
    supportHabits: ["Swipe review", "Voice notes", "Postmortem"],
    failurePatterns: ["Hides in ideation", "Over-edits before feedback", "Avoids visible output"],
    scoringRules: ["Published proof matters most", "Feedback loops beat drafts", "Cadence earns momentum"],
    achievements: ["Ugly Publish", "Hook Lab", "Audience Signal"],
    weeklyMilestones: ["3 shipped pieces", "10 hooks tested", "1 performance review"],
    antiDistractionProtocols: ["Record one rough take", "Ship the smallest version", "Mute analytics until publishing"]
  },
  trader: {
    key: "trader",
    label: "Trader",
    promise: "Rules before impulse.",
    missions: ["Session rules", "Risk review", "Post-trade journal", "Chart study", "Emotional reset"],
    supportHabits: ["Pre-market checklist", "Loss limit check", "Breathing reset"],
    failurePatterns: ["Revenge trades", "Moves rules after emotion spikes", "Confuses action with edge"],
    scoringRules: ["Rule adherence beats P&L", "Journal quality drives learning", "Risk control protects discipline"],
    achievements: ["No Revenge Day", "Risk Clean Week", "Journal Edge Found"],
    weeklyMilestones: ["5 rule reviews", "100% journaled trades", "1 bias identified"],
    antiDistractionProtocols: ["Read rules aloud", "Reduce size", "Step away after violation urge"]
  },
  developer: {
    key: "developer",
    label: "Developer",
    promise: "Shipped behavior before architecture comfort.",
    missions: ["Coding block", "Bug triage", "Shipping cadence", "Learning loop", "Code review"],
    supportHabits: ["Test first edge case", "Decision note", "Build log"],
    failurePatterns: ["Refactors to avoid release", "Researches past sufficiency", "Avoids ambiguous bugs"],
    scoringRules: ["Merged behavior weighs highest", "Tests raise proof quality", "Unblocked users beat elegance"],
    achievements: ["Bug Closed", "Ship Streak", "Test Guard"],
    weeklyMilestones: ["3 merged changes", "2 bugs resolved", "1 technical debt note"],
    antiDistractionProtocols: ["Run failing case", "Create smallest patch", "Open the exact file first"]
  },
  designer: {
    key: "designer",
    label: "Designer",
    promise: "Visible iteration before taste anxiety.",
    missions: ["Visual research", "Portfolio work", "Design review", "Prototype pass", "Creative energy tracking"],
    supportHabits: ["Reference capture", "Critique log", "Energy check"],
    failurePatterns: ["Waits for taste certainty", "Avoids critique", "Over-polishes low-risk surfaces"],
    scoringRules: ["Reviewed artifacts score highest", "Iteration count matters", "Energy informs creative blocks"],
    achievements: ["Critique Submitted", "Portfolio Proof", "Taste Iteration"],
    weeklyMilestones: ["2 reviewed screens", "1 portfolio artifact", "1 critique summary"],
    antiDistractionProtocols: ["Duplicate frame", "Make 3 rough variants", "Ask for one specific critique"]
  },
  athlete: {
    key: "athlete",
    label: "Athlete",
    promise: "Training proof before mood negotiation.",
    missions: ["Training block", "Recovery protocol", "Technique review", "Nutrition prep", "Mobility reset"],
    supportHabits: ["Sleep check", "Hydration", "Load notes"],
    failurePatterns: ["Skips when energy dips", "Avoids boring fundamentals", "Pushes recovery too late"],
    scoringRules: ["Completed sessions drive execution", "Recovery protects momentum", "Technique proof compounds"],
    achievements: ["Session Locked", "Recovery Protected", "Technique Upgrade"],
    weeklyMilestones: ["4 training proofs", "3 recovery logs", "1 performance review"],
    antiDistractionProtocols: ["Put gear on", "Start warmup only", "Move location immediately"]
  },
  operator: {
    key: "operator",
    label: "Operator",
    promise: "Critical path before inbox gravity.",
    missions: ["Ops review", "Process repair", "Escalation clear", "Team follow-up", "Metrics inspection"],
    supportHabits: ["Daily queue scan", "Bottleneck note", "Shutdown list"],
    failurePatterns: ["Lets inbox choose the day", "Avoids hard escalation", "Optimizes non-critical work"],
    scoringRules: ["Bottleneck removal scores high", "Response quality matters", "Review cadence protects clarity"],
    achievements: ["Bottleneck Broken", "Clean Escalation", "Ops Rhythm"],
    weeklyMilestones: ["3 bottlenecks removed", "1 process repaired", "1 metrics review"],
    antiDistractionProtocols: ["Name the bottleneck", "Send the hard message", "Close optional tabs"]
  },
  custom: {
    key: "custom",
    label: "Custom",
    promise: "One real outcome before the day scatters.",
    missions: ["Define mission", "Create proof", "Review pattern", "Protect energy", "Ship one outcome"],
    supportHabits: ["State log", "Proof log", "Night review"],
    failurePatterns: ["Keeps the mission vague", "Moves the target", "Avoids proof"],
    scoringRules: ["Proof beats intention", "Clarity reduces delay", "Consistency compounds"],
    achievements: ["First Proof", "Clarity Lock", "Momentum Week"],
    weeklyMilestones: ["5 lock-ons", "3 proof submissions", "1 pattern reviewed"],
    antiDistractionProtocols: ["Write the exact output", "Make a 5-minute version", "Change environment"]
  }
};

export const identityKeys = Object.keys(identitySystems) as IdentityKey[];
