"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brain, RotateCcw } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/ui/status-pill";
import { identitySystems } from "@/lib/identity-systems";
import { readStoredProfile } from "@/lib/profile-storage";
import type { OnboardingProfile } from "@/lib/types";

export function ProfilePanel() {
  const [profile, setProfile] = useState<OnboardingProfile | null | undefined>(undefined);

  useEffect(() => {
    setProfile(readStoredProfile());
  }, []);

  if (profile === undefined) {
    return (
      <GlassCard>
        <p className="text-sm text-white/60">Loading operating profile...</p>
      </GlassCard>
    );
  }

  if (!profile) {
    return (
      <GlassCard>
        <Brain className="h-7 w-7 text-signal" />
        <h2 className="mt-4 text-2xl font-semibold text-white">No profile configured.</h2>
        <p className="mt-2 text-sm leading-6 text-white/60">Cortex needs intake answers before it can generate missions without guessing.</p>
        <Link href="/onboarding" className="mt-5 inline-flex rounded-2xl bg-signal px-5 py-3 text-sm font-semibold text-ink shadow-button">
          Start intake
        </Link>
      </GlassCard>
    );
  }

  const identity = identitySystems[profile.identity];
  const label = profile.customIdentity || identity.label;

  return (
    <GlassCard>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <StatusPill tone="good">Current Operating Profile</StatusPill>
          <h2 className="mt-4 text-3xl font-semibold text-white">{label}</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">{identity.promise}</p>
        </div>
        <Link href="/onboarding?mode=edit" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white">
          <RotateCcw className="h-4 w-4" />
          Recalibrate
        </Link>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <ProfileFact label="Primary goal" value={profile.primaryGoal} />
        <ProfileFact label="Current project" value={profile.currentProject} />
        <ProfileFact label="Today counts if" value={profile.todayWin} />
        <ProfileFact label="Avoidance pattern" value={profile.avoidancePattern} />
        <ProfileFact label="Fake progress" value={profile.fakeProgressPattern} />
        <ProfileFact label="Real stakes" value={profile.realStakes} />
        <ProfileFact label="Proof preference" value={profile.proofPreference} />
        <ProfileFact label="Best work window" value={profile.bestWorkWindow} />
        <ProfileFact label="Danger window" value={profile.dangerWindow} />
        <ProfileFact label="Energy pattern" value={profile.energyPattern} />
        <ProfileFact label="Non-negotiable" value={profile.nonNegotiable} />
        <ProfileFact label="Consequence" value={profile.consequence} />
      </div>
    </GlassCard>
  );
}

function ProfileFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <p className="text-xs text-white/42">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/76 capitalize">{value}</p>
    </div>
  );
}
