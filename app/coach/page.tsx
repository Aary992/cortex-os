import { AlertTriangle, ArrowDown, Blocks, MoveRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { antiProcrastinationProtocol } from "@/lib/behavioral-memory";

export default function CoachPage() {
  const protocol = antiProcrastinationProtocol("the output can be judged");
  return (
    <div>
      <PageHeader eyebrow="AI Coach" title="Start ugly. Submit proof." subtitle="When delay appears, Cortex shrinks the mission, removes ambiguity, and changes the user's environment." />
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
