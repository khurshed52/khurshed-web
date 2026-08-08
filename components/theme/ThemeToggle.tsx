"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-zinc-400 transition hover:border-border hover:bg-panel hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}
