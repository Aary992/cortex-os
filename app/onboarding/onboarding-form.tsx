"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Brain, Check, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { identitySystems } from "@/lib/identity-systems";
import { defaultOnboardingProfile, readStoredProfile, writeStoredProfile } from "@/lib/profile-storage";
import type { IdentityKey, OnboardingProfile, ProofType } from "@/lib/types";

type Question =
  | { key: "identity"; title: string; subtitle: string; type: "identity" }
  | { key: "proofPreference"; title: string; subtitle: string; type: "proof" }
  | { key: "motivationStyle"; title: string; subtitle: string; type: "tone" }
  | { key: keyof OnboardingProfile; title: string; subtitle: string; placeholder: string; type: "text" };

const questions: Question[] = [
  { key: "identity", title: "What mode are you operating in?", subtitle: "This changes the kind of missions Cortex proposes.", type: "identity" },
  { key: "primaryGoal", title: "What are you trying to make real in the next 30 days?", subtitle: "One sentence. No life story.", placeholder: "Example: land 3 paid design clients", type: "text" },
  { key: "currentProject", title: "What project matters right now?", subtitle: "The thing that should receive today's best energy.", placeholder: "Example: portfolio case study and outreach list", type: "text" },
  { key: "todayWin", title: "What proof would make today count?", subtitle: "This becomes the seed for your first Lock-On.", placeholder: "Example: send 10 portfolio emails", type: "text" },
  { key: "avoidancePattern", title: "How do you usually avoid this work?", subtitle: "Cortex is useful only if it can name the dodge.", placeholder: "Example: I keep redesigning instead of showing the work", type: "text" },
  { key: "fakeProgressPattern", title: "What do you call progress when you are actually avoiding?", subtitle: "The expensive lie usually sounds responsible.", placeholder: "Example: collecting references, tweaking tools, rereading notes", type: "text" },
  { key: "realStakes", title: "What happens if this keeps drifting?", subtitle: "The app needs stakes, not motivational wallpaper.", placeholder: "Example: I stay invisible and never test the offer", type: "text" },
  { key: "proofPreference", title: "What kind of proof should Cortex demand?", subtitle: "No checkbox escapes. Pick the proof type you can actually submit.", type: "proof" },
  { key: "bestWorkWindow", title: "When are you sharpest?", subtitle: "Cortex protects this window.", placeholder: "Example: 09:00 - 11:00", type: "text" },
  { key: "dangerWindow", title: "When do you usually drift?", subtitle: "This is where future popups and friction rules matter.", placeholder: "Example: after dinner, before sleep", type: "text" },
  { key: "motivationStyle", title: "How should Cortex talk to you?", subtitle: "The wrong pressure style makes people quit.", type: "tone" },
  { key: "consequence", title: "What gets blocked if you drift?", subtitle: "Keep it practical and immediate.", placeholder: "Example: no YouTube until proof exists", type: "text" }
];

const proofTypes: ProofType[] = ["text", "image", "link", "file", "timer", "reflection"];
const tones: Array<OnboardingProfile["motivationStyle"]> = ["direct", "calm", "pressure", "analytical"];

export function OnboardingForm({ mode = "create" }: { mode?: "create" | "edit" }) {
  const router = useRouter();
  const [profile, setProfile] = useState<OnboardingProfile>(defaultOnboardingProfile);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (mode === "edit") {
      setProfile(readStoredProfile() || defaultOnboardingProfile);
    }
  }, [mode]);

  const question = questions[step];
  const progress = Math.round(((step + 1) / questions.length) * 100);
  const canContinue = useMemo(() => Boolean(profile[question.key]), [profile, question.key]);

  function update<Key extends keyof OnboardingProfile>(key: Key, value: OnboardingProfile[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function next() {
    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    writeStoredProfile(profile);
    router.push("/dashboard");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-signal/10 blur-3xl" />
        <Brain className="relative h-8 w-8 text-signal" />
        <h2 className="relative mt-5 text-2xl font-semibold text-white">{mode === "edit" ? "Recalibrate Cortex." : "Build your operating system."}</h2>
        <p className="relative mt-3 text-sm leading-6 text-white/62">
          Answer fast. Cortex will turn this into one Daily Lock-On, one proof standard, and one anti-drift protocol.
        </p>
        <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <div className="flex justify-between text-xs text-white/48">
            <span>Setup progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <motion.div className="h-2 rounded-full bg-signal" animate={{ width: `${progress}%` }} transition={{ duration: 0.35 }} />
          </div>
        </div>
        <div className="relative mt-5 space-y-3 text-sm text-white/58">
          <GuideLine done={step > 2}>Define the real target</GuideLine>
          <GuideLine done={step > 5}>Expose the avoidance loop</GuideLine>
          <GuideLine done={step > 8}>Set proof and timing</GuideLine>
          <GuideLine done={step > 10}>Choose the pressure style</GuideLine>
        </div>
      </GlassCard>

      <GlassCard>
        <motion.div key={question.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="flex items-center gap-2 text-sm font-semibold text-signal">
            <Sparkles className="h-4 w-4" />
            Cortex setup agent
          </div>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-4xl">{question.title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/58">{question.subtitle}</p>

          <div className="mt-7">
            {question.type === "text" && (
              <input
                value={String(profile[question.key] || "")}
                onChange={(event) => update(question.key, event.target.value as never)}
                placeholder={question.placeholder}
                className="w-full rounded-[22px] border border-white/10 bg-white/[0.06] px-5 py-4 text-base text-white outline-none placeholder:text-white/28 focus:border-signal/50"
                autoFocus
              />
            )}

            {question.type === "identity" && (
              <div className="grid gap-3 sm:grid-cols-3">
                {Object.values(identitySystems).map((identity) => (
                  <ChoiceButton key={identity.key} active={profile.identity === identity.key} onClick={() => update("identity", identity.key as IdentityKey)} label={identity.label} body={identity.promise} />
                ))}
              </div>
            )}

            {question.type === "proof" && (
              <div className="grid gap-3 sm:grid-cols-3">
                {proofTypes.map((proofType) => (
                  <ChoiceButton key={proofType} active={profile.proofPreference === proofType} onClick={() => update("proofPreference", proofType)} label={proofType} body={proofBody(proofType)} />
                ))}
              </div>
            )}

            {question.type === "tone" && (
              <div className="grid gap-3 sm:grid-cols-4">
                {tones.map((tone) => (
                  <ChoiceButton key={tone} active={profile.motivationStyle === tone} onClick={() => update("motivationStyle", tone)} label={tone} body={toneBody(tone)} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="glass-button inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button onClick={next} disabled={!canContinue} className="premium-button inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-45">
              {step === questions.length - 1 ? "Lock this in" : "Continue"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
}

function GuideLine({ done, children }: { done: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`grid h-6 w-6 place-items-center rounded-full border ${done ? "border-signal/40 bg-signal/20 text-signal" : "border-white/10 bg-white/[0.04] text-white/36"}`}>
        <Check className="h-3.5 w-3.5" />
      </span>
      {children}
    </div>
  );
}

function ChoiceButton({ active, onClick, label, body }: { active: boolean; onClick: () => void; label: string; body: string }) {
  return (
    <button onClick={onClick} className={`glass-button rounded-[22px] p-4 text-left ${active ? "border-signal/50 bg-signal/15" : ""}`}>
      <p className="font-semibold capitalize text-white">{label}</p>
      <p className="mt-2 text-xs leading-5 text-white/52">{body}</p>
    </button>
  );
}

function proofBody(proofType: ProofType) {
  return {
    text: "A concrete log with timestamp and result.",
    image: "Screenshot or photo of the artifact.",
    link: "Public or private URL to the proof.",
    file: "Uploaded artifact or deliverable.",
    timer: "Time block plus completion note.",
    reflection: "Short review of action and avoidance."
  }[proofType];
}

function toneBody(tone: OnboardingProfile["motivationStyle"]) {
  return {
    direct: "Sharp, simple, no fluff.",
    calm: "Low drama, steady pressure.",
    pressure: "Harder callouts when you drift.",
    analytical: "Pattern-first and precise."
  }[tone];
}
