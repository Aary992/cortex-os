import { BarChart3, Brain, CalendarCheck, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { behavioralPatterns } from "@/lib/behavioral-memory";
import { demoScores } from "@/lib/scoring";

const links = [
  { href: "/behavioral-twin", label: "Behavioral Twin", body: "The patterns Cortex has detected.", icon: Brain },
  { href: "/analytics", label: "Scores", body: "Execution, clarity, discipline, recovery.", icon: BarChart3 },
  { href: "/weekly-review", label: "Weekly Review", body: "What improved, declined, and drifted.", icon: CalendarCheck }
];

export default function PatternsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Patterns"
        title="The system studies the repeat behavior."
        subtitle="Cortex should not overwhelm the user with analytics. It should surface the one pattern that changes tomorrow."
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_.8fr]">
        <GlassCard>
          <p className="text-sm font-semibold text-signal">Strongest current read</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{behavioralPatterns[0].name}</h2>
          <p className="mt-3 text-sm leading-6 text-white/64">{behavioralPatterns[0].evidence}</p>
          <p className="mt-4 rounded-2xl border border-ember/20 bg-ember/10 p-4 text-sm leading-6 text-white/72">
            {behavioralPatterns[0].intervention}
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm font-semibold text-ice">Cognitive snapshot</p>
          <div className="mt-5 space-y-3">
            {Object.entries(demoScores).slice(0, 4).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-xs capitalize text-white/52">
                  <span>{key}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-signal" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {links.map((item) => (
          <a key={item.href} href={item.href} className="glass-button rounded-[24px] p-5">
            <item.icon className="h-5 w-5 text-signal" />
            <h2 className="mt-4 text-lg font-semibold text-white">{item.label}</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">{item.body}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal">
              Open <ChevronRight className="h-4 w-4" />
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
