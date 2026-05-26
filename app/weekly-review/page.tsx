import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";

const review = [
  ["Strongest pattern", "You execute faster when proof is public."],
  ["Weakest pattern", "Undefined morning tasks create a drift spiral."],
  ["Improved", "Proof quality rose from vague summaries to timestamped artifacts."],
  ["Declined", "Recovery score dropped after two skipped shutdown reviews."],
  ["Avoided", "Customer-facing work with rejection risk."],
  ["Next protocol", "Market proof before product polish, five days straight."],
  ["Uncomfortable truth", "You do not need more clarity. You need more contact."],
  ["Highest-leverage move", "Send ten direct asks before noon Monday."]
];

export default function WeeklyReviewPage() {
  return (
    <div>
      <PageHeader eyebrow="Weekly Operating Review" title="The system studies the week." subtitle="Cortex turns daily proof, scores, reviews, and avoidance into next week's operating protocol." />
      <div className="grid gap-4 md:grid-cols-2">
        {review.map(([title, body]) => (
          <GlassCard key={title}>
            <p className="text-sm font-semibold text-signal">{title}</p>
            <p className="mt-3 text-lg leading-7 text-white/78">{body}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
