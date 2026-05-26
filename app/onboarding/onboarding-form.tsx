"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { defaultOnboardingProfile, readStoredProfile, writeStoredProfile } from "@/lib/profile-storage";
import type { OnboardingProfile } from "@/lib/types";

const starter =
  "I want Cortex to help me with... I usually waste time on... I avoid work by... The thing I need to make real in the next 30 days is... If I keep drifting...";

export function OnboardingForm({ mode = "create" }: { mode?: "create" | "edit" }) {
  const router = useRouter();
  const [intake, setIntake] = useState("");
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit") {
      const stored = readStoredProfile();
      setProfile(stored);
      setIntake(stored?.rawIntake || "");
    }
  }, [mode]);

  async function interpret() {
    setLoading(true);
    const response = await fetch("/api/ai/interpret-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intake })
    });
    setProfile({ ...defaultOnboardingProfile, ...((await response.json()) as OnboardingProfile) });
    setLoading(false);
  }

  function save() {
    if (!profile) return;
    writeStoredProfile(profile);
    router.push("/dashboard");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-signal/10 blur-3xl" />
        <Brain className="relative h-8 w-8 text-signal" />
        <h2 className="relative mt-5 text-2xl font-semibold text-white">Cortex should interpret, not interrogate.</h2>
        <p className="relative mt-3 text-sm leading-6 text-white/62">
          Write messy context. The AI turns it into goals, drift patterns, distraction signals, proof rules, and micro-learning triggers.
        </p>
        <div className="relative mt-6 space-y-3">
          <Principle title="No fixed tasks" body="Cortex derives missions from the user's real context." />
          <Principle title="No fake productivity" body="Proof and interruption matter more than checkboxes." />
          <Principle title="Mobile-first future" body="The web app becomes the brain. Extensions/native apps become signal collectors." />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2 text-sm font-semibold text-signal">
          <Sparkles className="h-4 w-4" />
          Cortex intake
        </div>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-4xl">
          Tell Cortex where your attention actually goes.
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/58">
          Mention your goal, what you avoid, apps/sites you get pulled into, when you drift, and what kind of proof would count.
        </p>

        <textarea
          value={intake}
          onChange={(event) => setIntake(event.target.value)}
          placeholder={starter}
          className="mt-6 min-h-52 w-full resize-none rounded-[24px] border border-white/10 bg-white/[0.06] px-5 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/28 focus:border-signal/50"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button onClick={interpret} disabled={loading || intake.trim().length < 24} className="premium-button inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-45">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Interpret my system
          </button>
          <button onClick={save} disabled={!profile} className="glass-button inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
            Lock this in
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {profile && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-3 md:grid-cols-2">
            <Summary label="Goal" value={profile.primaryGoal} />
            <Summary label="Project" value={profile.currentProject} />
            <Summary label="Today counts if" value={profile.todayWin} />
            <Summary label="Avoidance" value={profile.avoidancePattern} />
            <Summary label="Fake progress" value={profile.fakeProgressPattern} />
            <Summary label="Distraction apps" value={(profile.distractionApps || []).join(", ")} />
            <Summary label="Micro-learning" value={(profile.microLearningTopics || []).join(", ")} />
            <Summary label="Intervention" value={profile.interventionPreference || "popup"} />
          </motion.div>
        )}
      </GlassCard>
    </div>
  );
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-white/55">{body}</p>
    </div>
  );
}

function Summary({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-white/35">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{value || "Not detected yet"}</p>
    </div>
  );
}
