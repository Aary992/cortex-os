import { OnboardingForm } from "@/app/onboarding/onboarding-form";
import { PageHeader } from "@/components/page-header";

export default function OnboardingPage({ searchParams }: { searchParams?: { mode?: string } }) {
  const mode = searchParams?.mode === "edit" ? "edit" : "create";

  return (
    <div>
      <PageHeader
        eyebrow="Onboarding"
        title={mode === "edit" ? "Recalibrate Cortex." : "Cortex needs the real context."}
        subtitle="Answer the questions that decide your missions, proof rules, pressure style, danger windows, and anti-procrastination protocol."
      />
      <OnboardingForm mode={mode} />
    </div>
  );
}
