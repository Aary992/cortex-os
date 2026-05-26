import { StatusPill } from "@/components/ui/status-pill";

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <StatusPill>{eyebrow}</StatusPill>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58 md:text-base">{subtitle}</p>
    </div>
  );
}
