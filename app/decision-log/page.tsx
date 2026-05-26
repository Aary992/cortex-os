import { CalendarDays, GitCompareArrows } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";

const decisions = [
  ["Raise prices for new customers", "Fear: churn. Expected outcome: stronger qualification.", "Review: June 12"],
  ["Stop rebuilding onboarding flow this week", "Tradeoff: less polish, more customer calls.", "Review: May 27"],
  ["Publish the rough case study", "Fear: public judgment. Expected outcome: useful signal.", "Review: May 24"]
];

export default function DecisionLogPage() {
  return (
    <div>
      <PageHeader eyebrow="Decision Log" title="Compare predictions to outcomes." subtitle="Cortex records context, options, fear, tradeoff, expected outcome, review date, and final result." />
      <div className="grid gap-4">
        {decisions.map(([decision, context, review]) => (
          <GlassCard key={decision}>
            <div className="flex items-start gap-4">
              <GitCompareArrows className="mt-1 h-5 w-5 text-signal" />
              <div>
                <h2 className="text-xl font-semibold text-white">{decision}</h2>
                <p className="mt-2 text-sm leading-6 text-white/62">{context}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-xs text-white/45"><CalendarDays className="h-4 w-4" />{review}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
