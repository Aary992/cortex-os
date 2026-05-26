import { Ban, Bell, Clock3, MonitorSmartphone, RotateCcw, Shield } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";

const rules = [
  { title: "Banned apps/sites", body: "Short video, market noise, inbox before Lock-On", Icon: Ban },
  { title: "Danger windows", body: "08:30-09:30 and 21:00-23:00", Icon: Clock3 },
  { title: "If-this-then-that", body: "If mission delay passes 15 minutes, shrink to five-minute proof", Icon: Shield },
  { title: "Cooldown ritual", body: "Walk, water, single-window reset, proof tool open", Icon: RotateCcw }
];

const detection = [
  { title: "Browser domains", body: "Cheap and realistic: detect user-defined sites through an extension.", Icon: MonitorSmartphone },
  { title: "Popup timing", body: "Only trigger inside danger windows, after delay, or after repeated opens.", Icon: Bell },
  { title: "Micro-action", body: "Replace passive scrolling with one reset, proof, or micro-learning action.", Icon: Shield }
];

export default function FrictionEnginePage() {
  return (
    <div>
      <PageHeader eyebrow="Friction Engine" title="Protect the mission from drift." subtitle="Start with practical signals, not expensive surveillance. Cortex can begin with self-defined rules and grow into a browser extension." />
      <GlassCard className="mb-5">
        <p className="text-sm font-semibold text-signal">Screen-time detection reality</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">A web app cannot see every app you open. A browser extension can detect sites.</h2>
        <p className="mt-3 text-sm leading-6 text-white/62">
          The no-capital path is to launch with manual danger windows and then ship a Chrome extension that watches selected domains. Native phone screen-time control comes later.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {detection.map(({ title, body, Icon }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <Icon className="h-4 w-4 text-signal" />
              <p className="mt-3 text-sm font-semibold text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/56">{body}</p>
            </div>
          ))}
        </div>
      </GlassCard>
      <div className="grid gap-4 md:grid-cols-2">
        {rules.map(({ title, body, Icon }) => (
          <GlassCard key={title}>
            <Icon className="h-5 w-5 text-ember" />
            <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/62">{body}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
