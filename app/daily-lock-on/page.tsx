import { DailyOS } from "@/components/daily-os";
import { PageHeader } from "@/components/page-header";

export default function DailyLockOnPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Daily Lock-On"
        title="One mission. Visible proof."
        subtitle="Cortex generates the Lock-On from the user's answers, not from a pre-decided task list."
      />
      <DailyOS mode="lock-on" />
    </div>
  );
}
