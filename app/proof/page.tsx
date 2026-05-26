import { PageHeader } from "@/components/page-header";
import { ProofForm } from "@/app/proof/proof-form";

export default function ProofPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Proof-Based Productivity"
        title="No checkbox escapes."
        subtitle="Cortex verifies the artifact, quality, timestamp, and specificity before the mission can become memory."
      />
      <ProofForm />
    </div>
  );
}
