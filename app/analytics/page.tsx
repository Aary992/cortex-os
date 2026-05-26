import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricRing } from "@/components/ui/metric-ring";
import { demoScores } from "@/lib/scoring";

export default function AnalyticsPage() {
  const scores = Object.entries(demoScores);
  return (
    <div>
      <PageHeader eyebrow="Cognitive Score Engine" title="Calculated from behavior." subtitle="Scores come from completion, proof quality, delay time, focus sessions, skipped missions, state logs, reviews, and weekly consistency." />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {scores.map(([label, value]) => (
          <MetricRing key={label} label={label[0].toUpperCase() + label.slice(1)} value={value} />
        ))}
      </div>
      <GlassCard className="mt-5">
        <h2 className="text-xl font-semibold text-white">Score rules</h2>
        <p className="mt-3 text-sm leading-6 text-white/62">Proof quality raises clarity. Delay damages discipline. Focus minutes lift momentum. Recovery only improves when shutdown reflection and state logs are real.</p>
      </GlassCard>
    </div>
  );
}
