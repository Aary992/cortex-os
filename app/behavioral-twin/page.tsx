import { Brain } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { behavioralPatterns } from "@/lib/behavioral-memory";

export default function BehavioralTwinPage() {
  return (
    <div>
      <PageHeader eyebrow="Behavioral Twin" title="The mirror gets sharper." subtitle="Cortex turns proof, delay, context, and review data into a living model of how the user actually behaves." />
      <div className="grid gap-4">
        {behavioralPatterns.map((pattern) => (
          <GlassCard key={pattern.name}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-signal" />
                  <h2 className="text-xl font-semibold text-white">{pattern.name}</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/62">{pattern.evidence}</p>
                <p className="mt-3 text-sm leading-6 text-white/78">{pattern.intervention}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center">
                <p className="text-2xl font-semibold text-white">{pattern.confidence}%</p>
                <p className="text-xs text-white/42">confidence</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
