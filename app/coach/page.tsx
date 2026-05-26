import { AlertTriangle, ArrowDown, Blocks, BookOpen, CheckCircle2, MoveRight, TimerReset } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { MicroLessonSimulator } from "@/components/micro-lesson-simulator";
import { antiProcrastinationProtocol } from "@/lib/behavioral-memory";

export default function CoachPage() {
  const protocol = antiProcrastinationProtocol("the output can be judged");
  return (
    <div>
      <PageHeader eyebrow="Coach" title="The intervention layer." subtitle="When drift appears, Cortex should not lecture. It should shrink the task, interrupt the loop, and redirect the user into one useful action." />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <GlassCard>
          <div className="flex items-start gap-4">
            <AlertTriangle className="mt-1 h-6 w-6 text-ember" />
            <div>
              <h2 className="text-2xl font-semibold text-white">Anti-procrastination protocol active</h2>
              <p className="mt-3 text-base leading-7 text-white/70">{protocol.message}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Step icon={ArrowDown} label="Shrink" value={protocol.shrink} />
            <Step icon={Blocks} label="Block" value={protocol.blocked} />
            <Step icon={MoveRight} label="Reset" value={protocol.resetAction} />
            <Step icon={MoveRight} label="Environment" value={protocol.environment} />
          </div>
        </GlassCard>
        <GlassCard>
          <p className="text-sm font-semibold text-signal">Future popup behavior</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">When social media opens, Cortex offers a smaller door.</h2>
          <p className="mt-3 text-sm leading-6 text-white/60">
            First version: a browser extension watches selected domains and danger windows. The popup does not shame the user. It offers one 60-second recovery action.
          </p>
          <div className="mt-5 space-y-3">
            <Action icon={TimerReset} title="60-second reset" body="Stand up, water, open proof tool." />
            <Action icon={BookOpen} title="Micro-learn" body="One useful concept tied to the mission." />
            <Action icon={CheckCircle2} title="Proof nudge" body="Submit the smallest evidence now." />
          </div>
        </GlassCard>
      </div>
      <GlassCard className="mt-5">
        <p className="text-sm font-semibold text-ice">Capital-light build path</p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <Step icon={MoveRight} label="MVP" value="Manual danger windows and user-defined blocked sites." />
          <Step icon={MoveRight} label="Extension" value="Detect domains and show Cortex popup." />
          <Step icon={MoveRight} label="Desktop" value="Optional local helper for app names." />
          <Step icon={MoveRight} label="Mobile" value="Later: Screen Time shortcuts or native app." />
        </div>
      </GlassCard>
      <div className="mt-5">
        <MicroLessonSimulator />
      </div>
    </div>
  );
}

function Step({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <Icon className="mb-3 h-4 w-4 text-signal" />
      <p className="text-xs text-white/42">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/74">{value}</p>
    </div>
  );
}

function Action({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="glass-button rounded-2xl p-4">
      <Icon className="h-4 w-4 text-signal" />
      <p className="mt-3 text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-5 text-white/55">{body}</p>
    </div>
  );
}
