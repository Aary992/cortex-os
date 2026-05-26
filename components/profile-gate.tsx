"use client";

import Link from "next/link";
import { Brain, ClipboardList } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function ProfileGate() {
  return (
    <GlassCard className="mx-auto max-w-2xl">
      <Brain className="h-9 w-9 text-signal" />
      <h1 className="mt-5 text-3xl font-semibold text-white">Cortex does not know your life yet.</h1>
      <p className="mt-3 text-sm leading-6 text-white/62">
        Answer a few questions first. Then Cortex will generate the Daily Lock-On from your actual goal, project, avoidance pattern, proof preference, and danger windows.
      </p>
      <Link href="/onboarding" className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-signal px-5 py-3 text-sm font-semibold text-ink shadow-button">
        <ClipboardList className="h-4 w-4" />
        Configure Cortex
      </Link>
    </GlassCard>
  );
}
