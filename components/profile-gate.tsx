"use client";

import Link from "next/link";
import { Brain, ClipboardList } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function ProfileGate() {
  return (
    <GlassCard className="mx-auto max-w-3xl overflow-hidden">
      <Brain className="h-9 w-9 text-signal" />
      <h1 className="mt-5 text-3xl font-semibold text-white md:text-5xl">Cortex does not know your operating system yet.</h1>
      <p className="mt-3 text-sm leading-6 text-white/62">
        Answer 12 fast questions. Cortex will build your Daily Lock-On protocol from your real goal, avoidance loop, proof standard, danger window, and pressure style.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Mini label="1" body="Name the real target" />
        <Mini label="2" body="Expose fake progress" />
        <Mini label="3" body="Lock proof rules" />
      </div>
      <Link href="/onboarding" className="premium-button mt-6 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-ink">
        <ClipboardList className="h-4 w-4" />
        Build my Cortex
      </Link>
    </GlassCard>
  );
}

function Mini({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs text-signal">{label}</p>
      <p className="mt-2 text-sm text-white/68">{body}</p>
    </div>
  );
}
