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
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold text-white">Cortex should become mobile-native, but signals come in layers.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/62">
            Android can expose app usage with user permission. iOS is much stricter and needs Screen Time / DeviceActivity capabilities. The capital-light path is web brain first, browser extension next, Android usage collector after that, and iOS native only when the product earns it.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/52">Extension-first</span>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <SignalStep title="Web" body="Today: Cortex brain, proof, micro-learning, and manual signal simulation." />
        <SignalStep title="Extension" body="Next: detect distracting sites and show Cortex popups inside the browser." />
        <SignalStep title="Mobile" body="Then: Android app usage with permission; iOS Screen Time integration later." />
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
