"use client";

import { useState } from "react";
import { FileCheck2, Loader2, Send } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/ui/status-pill";

type Result = { verdict: string; score: number; feedback: string } | null;

export function ProofForm() {
  const [proof, setProof] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  async function submitProof() {
    setLoading(true);
    const response = await fetch("/api/ai/verify-proof", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proof })
    });
    setResult(await response.json());
    setLoading(false);
  }

  return (
    <GlassCard>
      <div className="flex items-center justify-between gap-4">
        <div>
          <StatusPill>Proof Gate</StatusPill>
          <h2 className="mt-4 text-2xl font-semibold text-white">Submit evidence, not vibes.</h2>
          <p className="mt-2 text-sm leading-6 text-white/58">Use text, image notes, links, files, timer logs, or a reflection with enough detail to verify the mission happened.</p>
        </div>
        <FileCheck2 className="hidden h-8 w-8 text-signal sm:block" />
      </div>

      <textarea
        value={proof}
        onChange={(event) => setProof(event.target.value)}
        placeholder="Example: Sent 5 emails at 10:42 AM. Leads: Nadia, Sam, Priya, Omar, Chen. Screenshot saved in customer-outreach folder."
        className="mt-6 min-h-40 w-full resize-none rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-white outline-none placeholder:text-white/32 focus:border-signal/50"
      />

      <button
        onClick={submitProof}
        disabled={loading}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-signal px-5 py-3 text-sm font-semibold text-ink shadow-button disabled:opacity-60 sm:w-auto"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Verify proof
      </button>

      {result && (
        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.055] p-5">
          <p className="text-sm font-semibold capitalize text-signal">{result.verdict}</p>
          <p className="mt-2 text-sm leading-6 text-white/68">{result.feedback}</p>
          <p className="mt-3 text-xs text-white/42">Proof quality score: {Math.round(result.score * 100)}</p>
        </div>
      )}
    </GlassCard>
  );
}
