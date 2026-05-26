import { cn } from "@/lib/utils";

export function MetricRing({ label, value, className }: { label: string; value: number; className?: string }) {
  const angle = Math.max(0, Math.min(100, value)) * 3.6;
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3", className)}>
      <div
        className="grid h-14 w-14 place-items-center rounded-full"
        style={{ background: `conic-gradient(#8FE8C8 ${angle}deg, rgba(255,255,255,.1) 0deg)` }}
      >
        <div className="grid h-11 w-11 place-items-center rounded-full bg-ink text-sm font-semibold">{value}</div>
      </div>
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-white/50">behavioral score</p>
      </div>
    </div>
  );
}
