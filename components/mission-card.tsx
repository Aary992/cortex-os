import { Clock, Flag, Gauge, LockKeyhole, Sparkles, Target } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/ui/status-pill";
import type { DailyMission } from "@/lib/types";

export function MissionCard({ mission, expanded = false }: { mission: DailyMission; expanded?: boolean }) {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-signal/10 blur-3xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <StatusPill tone="good">Daily Lock-On</StatusPill>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">{mission.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">{mission.objective}</p>
        </div>
        <div className="hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 md:block">
          <Target className="h-8 w-8 text-signal" />
        </div>
      </div>

      <div className="relative mt-6 grid gap-3 md:grid-cols-4">
        <Fact icon={Clock} label="Deadline" value={mission.deadline} />
        <Fact icon={Gauge} label="Difficulty" value={`${mission.difficulty}/5`} />
        <Fact icon={Flag} label="Estimate" value={mission.timeEstimate} />
        <Fact icon={LockKeyhole} label="Status" value={mission.status.replace("_", " ")} />
      </div>

      <div className="relative mt-6 grid gap-4 md:grid-cols-2">
        <Panel title="Why It Matters" body={mission.whyItMatters} />
        <Panel title="Avoidance Prediction" body={mission.avoidancePrediction} warn />
        <Panel title="Exact First Move" body={mission.firstMove} />
        <Panel title="Proof Required" body={mission.proofRequired} />
      </div>

      {expanded && (
        <div className="relative mt-4 grid gap-4 md:grid-cols-3">
          <Panel title="Fallback" body={mission.fallbackVersion} />
          <Panel title="Reward" body={mission.reward} />
          <Panel title="Consequence" body={mission.consequence} warn />
        </div>
      )}

      <div className="relative mt-4 rounded-2xl border border-ember/20 bg-ember/10 p-4">
        <p className="text-sm font-semibold text-ember">Pressure Message</p>
        <p className="mt-2 text-sm leading-6 text-white/76">{mission.pressureMessage}</p>
      </div>

      <div className="relative mt-4 grid gap-4 md:grid-cols-2">
        <ListPanel title="Anti-Drift Protocol" items={mission.antiDriftProtocol} />
        <ListPanel title="Scoring Signals" items={mission.scoringSignals} />
      </div>

      {expanded && (
        <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <p className="text-sm font-semibold text-signal">Tomorrow Memory Seed</p>
          <p className="mt-2 text-sm leading-6 text-white/64">{mission.tomorrowMemorySeed}</p>
        </div>
      )}

      {mission.contextTrace && (
        <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <p className="text-sm font-semibold text-ice">Why Cortex chose this</p>
          <p className="mt-2 text-sm leading-6 text-white/64">
            Goal: {mission.contextTrace.sourceGoal}. Project: {mission.contextTrace.sourceProject}. Avoidance: {mission.contextTrace.sourceAvoidance}. Protected window: {mission.contextTrace.sourceWindow}.
          </p>
        </div>
      )}

      <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
        <a href="/proof" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-signal px-5 py-3 text-sm font-semibold text-ink shadow-button">
          <Sparkles className="h-4 w-4" />
          Submit proof
        </a>
        <a href="/coach" className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white">
          I am delaying
        </a>
      </div>
    </GlassCard>
  );
}

function Fact({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <Icon className="mb-3 h-4 w-4 text-ice" />
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 text-sm font-semibold capitalize text-white">{value}</p>
    </div>
  );
}

function Panel({ title, body, warn }: { title: string; body: string; warn?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className={warn ? "text-sm font-semibold text-ember" : "text-sm font-semibold text-signal"}>{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/68">{body}</p>
    </div>
  );
}

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-sm font-semibold text-ice">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <p key={item} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm leading-6 text-white/66">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
