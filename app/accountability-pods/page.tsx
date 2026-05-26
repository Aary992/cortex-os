import { Flame, MessageSquare, Trophy, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/ui/glass-card";

const features = [
  { title: "Shared mission feed", body: "Friends see the mission, deadline, and proof status.", Icon: Users },
  { title: "Proof feed", body: "Accepted proof creates social pressure without noisy posting.", Icon: MessageSquare },
  { title: "Streak leaderboard", body: "Ranks consistency, not vanity metrics.", Icon: Trophy },
  { title: "Accountability nudges", body: "Pods can trigger reset protocols when someone drifts.", Icon: Flame }
];

export default function AccountabilityPodsPage() {
  return (
    <div>
      <PageHeader eyebrow="Accountability Pods" title="Make proof visible." subtitle="Invite trusted people, share mission status, review weekly patterns, and create social friction around the work that matters." />
      <div className="grid gap-4 md:grid-cols-2">
        {features.map(({ title, body, Icon }) => (
          <GlassCard key={title}>
            <Icon className="h-5 w-5 text-signal" />
            <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/62">{body}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
