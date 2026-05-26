import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader eyebrow="Settings" title="System controls." subtitle="Connect Supabase, OpenAI, PWA install behavior, notification cadence, memory permissions, and proof strictness." />
      <GlassCard>
        <div className="grid gap-4 md:grid-cols-2">
          {["Supabase auth enabled", "OpenAI verification fallback", "PWA install ready", "Proof strictness high", "Night review at 21:30", "Memory updates after review"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-4">
              <span className="text-sm text-white/72">{item}</span>
              <span className="h-6 w-11 rounded-full bg-signal/80 p-1"><span className="block h-4 w-4 translate-x-5 rounded-full bg-ink" /></span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
