import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { ProfilePanel } from "@/components/profile-panel";
import { identitySystems } from "@/lib/identity-systems";

export default function IdentityPage() {
  return (
    <div>
      <PageHeader eyebrow="Identity System" title="Choose the operating protocol." subtitle="Each identity changes missions, support habits, failure patterns, scoring rules, achievements, weekly milestones, and anti-distraction moves." />
      <div className="mb-5">
        <ProfilePanel />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.values(identitySystems).map((system) => (
          <GlassCard key={system.key}>
            <h2 className="text-xl font-semibold text-white">{system.label}</h2>
            <p className="mt-2 text-sm text-signal">{system.promise}</p>
            <List title="Failure patterns" items={system.failurePatterns} />
            <List title="Achievements" items={system.achievements} />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-xs uppercase tracking-[0.18em] text-white/36">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-white/68">{item}</p>)}
      </div>
    </div>
  );
}
