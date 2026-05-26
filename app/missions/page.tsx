import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { identitySystems } from "@/lib/identity-systems";

export default function MissionsPage() {
  return (
    <div>
      <PageHeader eyebrow="Mission Library" title="Different identities need different pressure." subtitle="Missions adapt to the user's operating context instead of hardcoding one person's habits." />
      <div className="grid gap-4 md:grid-cols-2">
        {Object.values(identitySystems).map((system) => (
          <GlassCard key={system.key}>
            <h2 className="text-xl font-semibold text-white">{system.label}</h2>
            <p className="mt-2 text-sm text-signal">{system.promise}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {system.missions.map((mission) => (
                <span key={mission} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-white/65">{mission}</span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
