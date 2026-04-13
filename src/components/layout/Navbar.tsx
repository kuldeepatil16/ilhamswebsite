"use client";


import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { COMPANY } from "@/lib/constants";
import { cn, getBasePathWithoutLocale } from "@/lib/utils";
import type { Locale } from "@/types";
import ThemeToggle from "./ThemeToggle";

const locales: Locale[] = ["fr", "ar", "en"];

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const basePath = getBasePathWithoutLocale(pathname);
  const links = [
    ["/", t("nav.home")],
    ["/services", t("nav.services")],
    ["/products", t("nav.products")],
    ["/parts", t("nav.parts")],
    ["/about", t("nav.about")],
    ["/blog", t("nav.blog")],
    ["/contact", t("nav.contact")],
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-surface/95 text-foreground backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={t("accessibility.logoAlt")}>
          <img src="/images/logo.svg" alt={t("accessibility.logoAlt")} className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([path, label]) => {
            const href = `/${locale}${path === "/" ? "" : path}`;
            const active = basePath === path || (path !== "/" && basePath.startsWith(path));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <div className="rounded-full bg-muted p-1">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}${basePath === "/" ? "" : basePath}`}
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-semibold",
                  loc === locale ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={t("accessibility.changeLanguage")}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
          <a href={`tel:${COMPANY.phone1}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
            <Phone size={14} /> {COMPANY.phone1}
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("accessibility.closeMenu") : t("accessibility.openMenu")}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface p-4 lg:hidden">
          <div className="space-y-1">
            {links.map(([path, label]) => {
              const href = `/${locale}${path === "/" ? "" : path}`;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-foreground hover:bg-muted"
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex gap-2">
            <div className="flex flex-1 items-center justify-center rounded-md bg-muted py-2">
              <ThemeToggle />
            </div>
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}${basePath === "/" ? "" : basePath}`}
                onClick={() => setOpen(false)}
                className={cn("flex-1 rounded-md px-2 py-2 text-center text-sm", loc === locale ? "bg-accent text-accent-foreground" : "bg-muted text-foreground")}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
