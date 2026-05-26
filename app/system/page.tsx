import { Bot, ChevronRight, Compass, MonitorSmartphone, Shield, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";

const systemLinks = [
  { href: "/identity", label: "Operating Profile", body: "Identity, stakes, proof standard, work windows.", icon: Compass },
  { href: "/friction-engine", label: "Friction Rules", body: "Danger windows, blocked sites, cooldown rituals.", icon: Shield },
  { href: "/decision-log", label: "Decision Log", body: "Predictions versus outcomes.", icon: SlidersHorizontal },
  { href: "/accountability-pods", label: "Pods", body: "Optional social proof and accountability.", icon: Bot }
];

export default function SystemPage() {
  return (
    <div>
      <PageHeader
        eyebrow="System"
        title="The advanced controls stay out of the way."
        subtitle="Most users should live in Today. System is where Cortex learns what to protect, block, watch, and escalate."
      />
      <SignalLayer />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {systemLinks.map((item) => (
          <a key={item.href} href={item.href} className="glass-button rounded-[24px] p-5">
            <item.icon className="h-5 w-5 text-signal" />
            <h2 className="mt-4 text-lg font-semibold text-white">{item.label}</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">{item.body}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal">
              Open <ChevronRight className="h-4 w-4" />
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

function SignalLayer() {
  return (
    <GlassCard>
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <MonitorSmartphone className="h-6 w-6 text-signal" />
            <p className="text-sm font-semibold text-signal">Signal Layer</p>
          </div>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold text-white">Detect drift without building a billion-dollar device stack.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/62">
            A web app cannot reliably see every app a person opens. The capital-light path is a browser extension first: detect distracting domains, trigger Cortex popups, and offer a micro-action instead of passive scrolling.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/52">Extension-first</span>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <SignalStep title="1. Detect" body="Watch user-defined sites like Instagram, X, YouTube, Reddit, trading feeds, or custom domains." />
        <SignalStep title="2. Interrupt" body="Show a calm popup only during chosen danger windows or after a threshold." />
        <SignalStep title="3. Redirect" body="Offer a 60-second Cortex action: shrink mission, micro-learn, submit proof, or reset environment." />
      </div>
    </GlassCard>
  );
}

function SignalStep({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/58">{body}</p>
    </div>
  );
}
