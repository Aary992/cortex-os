import { Brain } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function AuthPage() {
  return (
    <div className="mx-auto max-w-md pt-12">
      <GlassCard>
        <Brain className="h-9 w-9 text-signal" />
        <h1 className="mt-5 text-3xl font-semibold text-white">Enter Cortex OS</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">Your Daily Lock-On, proof gate, and behavioral memory start after sign in.</p>
        <div className="mt-6 space-y-3">
          <input className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none placeholder:text-white/32" placeholder="Email" />
          <input className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none placeholder:text-white/32" placeholder="Password" type="password" />
          <a href="/onboarding" className="inline-flex w-full justify-center rounded-2xl bg-signal px-5 py-3 text-sm font-semibold text-ink shadow-button">Continue</a>
        </div>
      </GlassCard>
    </div>
  );
}
