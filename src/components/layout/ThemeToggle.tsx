"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type ThemeMode = "light" | "dark";

function applyTheme(mode: ThemeMode) {
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
}

export default function ThemeToggle() {
  const t = useTranslations("accessibility");
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        applyTheme(next);
      }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-white/20"
      aria-label={t("toggleTheme")}
      title={t("toggleTheme")}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

