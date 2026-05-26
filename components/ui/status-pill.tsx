import { cn } from "@/lib/utils";

export function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tone === "good" && "border-signal/40 bg-signal/15 text-signal",
        tone === "warn" && "border-ember/40 bg-ember/15 text-ember",
        tone === "neutral" && "border-white/12 bg-white/[0.06] text-white/70"
      )}
    >
      {children}
    </span>
  );
}
