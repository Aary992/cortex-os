import { Ban, Clock3, RotateCcw, Shield } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";

const rules = [
  { title: "Banned apps/sites", body: "Short video, market noise, inbox before Lock-On", Icon: Ban },
  { title: "Danger windows", body: "08:30-09:30 and 21:00-23:00", Icon: Clock3 },
  { title: "If-this-then-that", body: "If mission delay passes 15 minutes, shrink to five-minute proof", Icon: Shield },
  { title: "Cooldown ritual", body: "Walk, water, single-window reset, proof tool open", Icon: RotateCcw }
];

export default function FrictionEnginePage() {
  return (
    <div>
      <PageHeader eyebrow="Friction Engine" title="Protect the mission from drift." subtitle="Real app blocking can come later. The architecture already models banned apps, danger windows, dopamine triggers, penalty tasks, and environment changes." />
      <div className="grid gap-4 md:grid-cols-2">
        {rules.map(({ title, body, Icon }) => (
          <GlassCard key={title}>
            <Icon className="h-5 w-5 text-ember" />
            <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/62">{body}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
