import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cn("glass rounded-[28px] p-5 md:p-6", className)}>{children}</section>;
}
