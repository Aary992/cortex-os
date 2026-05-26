"use client";

import { useEffect, useState } from "react";
import { Brain, ChevronRight, ShieldAlert, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricRing } from "@/components/ui/metric-ring";
import { MissionCard } from "@/components/mission-card";
import { ProfileGate } from "@/components/profile-gate";
import { generateBriefing } from "@/lib/mission-generator";
import { demoScores } from "@/lib/scoring";
import { behavioralPatterns } from "@/lib/behavioral-memory";
import { readStoredProfile } from "@/lib/profile-storage";
import type { DailyMission, OnboardingProfile } from "@/lib/types";

export function DailyOS({ mode = "dashboard" }: { mode?: "dashboard" | "lock-on" }) {
  const [profile, setProfile] = useState<OnboardingProfile | null | undefined>(undefined);
  const [aiMission, setAiMission] = useState<DailyMission | null>(null);

  useEffect(() => {
    setProfile(readStoredProfile());
  }, []);

  useEffect(() => {
    if (!profile) return;

    let cancelled = false;
    const activeProfile = profile;

    async function generateMission() {
      const localMission = generateBriefing(activeProfile.identity, activeProfile).mission;

      try {
        const response = await fetch("/api/ai/daily-lock-on", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identity: activeProfile.identity,
            profile: activeProfile,
            memory: [localMission.tomorrowMemorySeed]
          })
        });

        if (!response.ok) return;

        const mission = (await response.json()) as DailyMission;
        if (!cancelled) setAiMission({ ...localMission, ...mission });
      } catch {
        if (!cancelled) setAiMission(localMission);
      }
    }

    generateMission();

    return () => {
      cancelled = true;
    };
  }, [profile]);

  if (profile === undefined) {
    return <GlassCard><p className="text-sm text-white/60">Loading Cortex profile...</p></GlassCard>;
  }

  if (!profile) {
    return <ProfileGate />;
  }

  const briefing = generateBriefing(profile.identity, profile);
  const mission = aiMission || briefing.mission;

  if (mode === "lock-on") {
    return <MissionCard mission={mission} expanded />;
  }

  return (
    <div className="space-y-5">
      <MissionCard mission={mission} />

      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/45">Morning Briefing</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">Today has one job.</h2>
            </div>
            <Zap className="h-6 w-6 text-volt" />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Brief label="Risk zone" value={briefing.riskZone} />
            <Brief label="Best work window" value={briefing.bestWorkWindow} />
            <Brief label="Likely avoidance" value={briefing.likelyAvoidance} />
            <Brief label="First move" value={briefing.exactFirstMove} />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-signal" />
            <h2 className="text-xl font-semibold text-white">Behavioral Twin</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/60">{behavioralPatterns[0].evidence}</p>
          <div className="mt-5 rounded-2xl border border-ember/20 bg-ember/10 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-4 w-4 text-ember" />
              <p className="text-sm leading-6 text-white/72">{behavioralPatterns[0].intervention}</p>
            </div>
          </div>
          <a href="/behavioral-twin" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal">
            Open pattern map <ChevronRight className="h-4 w-4" />
          </a>
        </GlassCard>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <MetricRing label="Execution" value={demoScores.execution} />
        <MetricRing label="Focus" value={demoScores.focus} />
        <MetricRing label="Momentum" value={demoScores.momentum} />
      </div>
    </div>
  );
}

function Brief({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <p className="text-xs text-white/42">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/78">{value}</p>
    </div>
  );
}
