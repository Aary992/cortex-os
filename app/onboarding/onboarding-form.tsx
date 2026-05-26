"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Check, ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { identitySystems } from "@/lib/identity-systems";
import { defaultOnboardingProfile, readStoredProfile, writeStoredProfile } from "@/lib/profile-storage";
import type { OnboardingProfile, ProofType } from "@/lib/types";

const proofTypes: ProofType[] = ["text", "image", "link", "file", "timer", "reflection"];

export function OnboardingForm({ mode = "create" }: { mode?: "create" | "edit" }) {
  const router = useRouter();
  const [profile, setProfile] = useState<OnboardingProfile>(defaultOnboardingProfile);

  useEffect(() => {
    if (mode === "edit") {
      setProfile(readStoredProfile() || defaultOnboardingProfile);
    }
  }, [mode]);

  function update<Key extends keyof OnboardingProfile>(key: Key, value: OnboardingProfile[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function submit() {
    writeStoredProfile(profile);
    router.push("/dashboard");
  }

  const ready =
    profile.primaryGoal &&
    profile.currentProject &&
    profile.todayWin &&
    profile.avoidancePattern &&
    profile.fakeProgressPattern &&
    profile.realStakes;

  return (
    <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
      <GlassCard>
        <Brain className="h-8 w-8 text-signal" />
        <h2 className="mt-5 text-2xl font-semibold text-white">{mode === "edit" ? "Recalibrate the operating system." : "This is the source code for your day."}</h2>
        <p className="mt-3 text-sm leading-6 text-white/62">
          Cortex should ask before it commands. These answers become the live context behind each Daily Lock-On.
        </p>
        <div className="mt-6 space-y-3">
          {[
            "What are you trying to become?",
            "What project matters now?",
            "What proof would make today real?",
            "How do you usually avoid it?",
            "What fake progress do you hide inside?",
            "What happens if this keeps drifting?"
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-sm text-white/70">
              <Check className="h-4 w-4 text-signal" />
              {item}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <div className="space-y-6">
          <Field label="Identity">
            <div className="grid gap-2 sm:grid-cols-3">
              {Object.values(identitySystems).map((identity) => (
                <button
                  key={identity.key}
                  onClick={() => update("identity", identity.key)}
                  className={`rounded-2xl border p-3 text-left text-sm transition ${
                    profile.identity === identity.key ? "border-signal/60 bg-signal/15 text-white" : "border-white/10 bg-white/[0.045] text-white/60"
                  }`}
                >
                  {identity.label}
                </button>
              ))}
            </div>
          </Field>

          {profile.identity === "custom" && (
            <TextField label="Custom identity" value={profile.customIdentity || ""} onChange={(value) => update("customIdentity", value)} placeholder="Example: Researcher, musician, agency owner" />
          )}

          <TextField label="Primary goal" value={profile.primaryGoal} onChange={(value) => update("primaryGoal", value)} placeholder="Example: Build a profitable design studio" />
          <TextField label="Current project" value={profile.currentProject} onChange={(value) => update("currentProject", value)} placeholder="Example: Launch my portfolio and outreach system" />
          <TextField label="What would make today count?" value={profile.todayWin} onChange={(value) => update("todayWin", value)} placeholder="Example: Send the first 10 portfolio emails" />
          <TextField label="How do you usually avoid this?" value={profile.avoidancePattern} onChange={(value) => update("avoidancePattern", value)} placeholder="Example: I keep redesigning instead of asking for feedback" />
          <TextField label="What do you call progress when you are actually avoiding?" value={profile.fakeProgressPattern} onChange={(value) => update("fakeProgressPattern", value)} placeholder="Example: collecting more references, tweaking tools, rereading notes" />
          <TextField label="What are the real stakes if this keeps drifting?" value={profile.realStakes} onChange={(value) => update("realStakes", value)} placeholder="Example: I stay invisible and never test whether the offer works" />

          <Field label="Proof preference">
            <div className="grid gap-2 sm:grid-cols-3">
              {proofTypes.map((proofType) => (
                <button
                  key={proofType}
                  onClick={() => update("proofPreference", proofType)}
                  className={`rounded-2xl border px-3 py-2 text-left text-sm capitalize transition ${
                    profile.proofPreference === proofType ? "border-signal/60 bg-signal/15 text-white" : "border-white/10 bg-white/[0.045] text-white/60"
                  }`}
                >
                  {proofType}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Best work window" value={profile.bestWorkWindow} onChange={(value) => update("bestWorkWindow", value)} placeholder="09:00 - 11:00" />
            <TextField label="Danger window" value={profile.dangerWindow} onChange={(value) => update("dangerWindow", value)} placeholder="Example: after dinner, before sleep" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Energy pattern" value={profile.energyPattern} onChange={(value) => update("energyPattern", value)} placeholder="Example: strongest after movement, weakest after lunch" />
            <TextField label="Real constraint" value={profile.constraints} onChange={(value) => update("constraints", value)} placeholder="Example: only 45 focused minutes before calls begin" />
          </div>

          <Field label="Coach tone">
            <div className="grid gap-2 sm:grid-cols-4">
              {(["direct", "calm", "pressure", "analytical"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => update("motivationStyle", style)}
                  className={`rounded-2xl border px-3 py-2 text-left text-sm capitalize transition ${
                    profile.motivationStyle === style ? "border-signal/60 bg-signal/15 text-white" : "border-white/10 bg-white/[0.045] text-white/60"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </Field>

          <TextField label="Non-negotiable rule" value={profile.nonNegotiable} onChange={(value) => update("nonNegotiable", value)} placeholder="Example: one public proof before consumption" />
          <TextField label="Reward that actually works" value={profile.preferredReward} onChange={(value) => update("preferredReward", value)} placeholder="Example: unlock analytics, gym break, public streak, XP" />
          <TextField label="Consequence if you drift" value={profile.consequence} onChange={(value) => update("consequence", value)} placeholder="Example: no YouTube until proof exists" />

          <button
            onClick={submit}
            disabled={!ready}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-signal px-5 py-3 text-sm font-semibold text-ink shadow-button disabled:cursor-not-allowed disabled:opacity-45"
          >
            {mode === "edit" ? "Save recalibration" : "Generate my Cortex OS"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/38">{label}</span>
      {children}
    </div>
  );
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <Field label={label}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-signal/50"
      />
    </Field>
  );
}
