"use client";

import { useEffect, useState } from "react";
import { BookOpen, Loader2, MonitorSmartphone } from "lucide-react";
import { readStoredProfile } from "@/lib/profile-storage";
import type { MicroLesson, PhoneSignal } from "@/lib/types";

const signal: PhoneSignal = {
  source: "manual",
  appOrSite: "Instagram",
  category: "social",
  openedAt: new Date().toISOString(),
  durationSeconds: 0,
  triggerReason: "opened during danger window"
};

export function MicroLessonSimulator() {
  const [lesson, setLesson] = useState<MicroLesson | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const response = await fetch("/api/ai/micro-lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signal, profile: readStoredProfile() })
    });
    setLesson((await response.json()) as MicroLesson);
    setLoading(false);
  }

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="glass-button rounded-[24px] p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <MonitorSmartphone className="h-5 w-5 text-ember" />
          <p className="text-sm font-semibold text-white">Simulated drift signal: Instagram opened</p>
        </div>
        <button onClick={generate} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/64">
          regenerate
        </button>
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
        {loading || !lesson ? (
          <div className="flex items-center gap-2 text-sm text-white/55">
            <Loader2 className="h-4 w-4 animate-spin" />
            Cortex is creating the intervention...
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm font-semibold text-signal">
              <BookOpen className="h-4 w-4" />
              {lesson.title}
            </div>
            <p className="mt-3 text-sm leading-6 text-white/68">{lesson.insight}</p>
            <p className="mt-3 rounded-xl border border-signal/20 bg-signal/10 p-3 text-sm leading-6 text-white/76">{lesson.action}</p>
            <p className="mt-3 text-xs text-white/42">Proof prompt: {lesson.proofPrompt}</p>
          </>
        )}
      </div>
    </div>
  );
}
