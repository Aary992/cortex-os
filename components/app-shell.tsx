"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  MessageCircle,
  Moon,
  Settings,
  Target,
  Workflow
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Today", icon: Target },
  { href: "/coach", label: "Coach", icon: MessageCircle },
  { href: "/patterns", label: "Patterns", icon: Brain },
  { href: "/system", label: "System", icon: Workflow }
];

const activeGroups: Record<string, string[]> = {
  "/dashboard": ["/dashboard", "/daily-lock-on", "/proof"],
  "/coach": ["/coach"],
  "/patterns": ["/patterns", "/behavioral-twin", "/analytics", "/weekly-review"],
  "/system": ["/system", "/identity", "/missions", "/decision-log", "/friction-engine", "/accountability-pods", "/settings"]
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-cortex-field" />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/45 backdrop-blur-2xl">
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
          <div className="hidden items-center gap-2 rounded-full glass-button px-3 py-2 text-xs text-white/68 md:flex">
            <Moon className="h-4 w-4 text-ice" />
            Night review arms tomorrow
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 pb-28 pt-6 md:grid-cols-[190px_1fr] md:pb-8">
        <aside className="hidden md:block">
          <nav className="glass sticky top-20 rounded-[26px] p-2">
            {nav.map((item) => {
              const active = activeGroups[item.href]?.some((path) => pathname === path) || pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/58 transition hover:text-white",
                    active && "text-white"
                  )}
                >
                  {active && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-2xl bg-white/10 shadow-glass" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-signal">
                <Settings className="h-3.5 w-3.5" />
                Signal Layer
              </div>
              <p className="text-xs leading-5 text-white/48">Browser extension first. App blocking later.</p>
            </div>
          </nav>
        </aside>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: "easeOut" }}>{children}</motion.div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-50 flex justify-between gap-2 rounded-[26px] border border-white/10 bg-ink/75 p-2 backdrop-blur-2xl md:hidden">
        {nav.map((item) => {
          const active = activeGroups[item.href]?.some((path) => pathname === path) || pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-16 flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] text-white/50 transition",
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
