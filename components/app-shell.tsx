"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Brain,
  CalendarCheck,
  Flame,
  Home,
  LockKeyhole,
  MessageCircle,
  Moon,
  Settings,
  Shield,
  Target,
  Users,
  UserRound,
  Workflow
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/daily-lock-on", label: "Lock-On", icon: Target },
  { href: "/proof", label: "Proof", icon: LockKeyhole },
  { href: "/missions", label: "Missions", icon: CalendarCheck },
  { href: "/coach", label: "Coach", icon: MessageCircle },
  { href: "/behavioral-twin", label: "Twin", icon: Brain },
  { href: "/analytics", label: "Scores", icon: BarChart3 },
  { href: "/identity", label: "Identity", icon: UserRound },
  { href: "/decision-log", label: "Decisions", icon: Workflow },
  { href: "/friction-engine", label: "Friction", icon: Shield },
  { href: "/accountability-pods", label: "Pods", icon: Users },
  { href: "/weekly-review", label: "Review", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-cortex-field" />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/55 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 soft-ring">
              <Brain className="h-5 w-5 text-signal" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">Cortex OS</p>
              <p className="text-xs text-white/45">Proof beats intention</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/60 md:flex">
            <Moon className="h-4 w-4 text-ice" />
            Night review arms tomorrow
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 pb-28 pt-5 md:grid-cols-[230px_1fr] md:pb-8">
        <aside className="hidden md:block">
          <nav className="glass sticky top-20 rounded-[28px] p-2">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/60 transition hover:text-white",
                    active && "text-white"
                  )}
                >
                  {active && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-2xl bg-white/10" />}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div>{children}</div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-50 flex gap-2 overflow-x-auto rounded-[26px] border border-white/10 bg-ink/75 p-2 backdrop-blur-2xl no-scrollbar md:hidden">
        {nav.slice(0, 8).map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-16 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] text-white/50",
                active && "bg-white/10 text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
