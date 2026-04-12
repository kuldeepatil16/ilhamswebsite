"use client";


import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/types";

export default function AdminSidebar() {
  const t = useTranslations("admin.nav");
  const locale = useLocale() as Locale;
  const router = useRouter();

  const links = [
    ["", t("dashboard")],
    ["/products", t("products")],
    ["/parts", t("parts")],
    ["/leads", t("leads")],
    ["/service-requests", t("serviceRequests")],
    ["/blog", t("blog")],
  ] as const;

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <aside className="ui-surface w-full rounded-xl p-4 lg:w-64">
      <nav className="space-y-1">
        {links.map(([path, label]) => (
          <Link key={path} href={`/${locale}/admin${path}`} className="ui-muted hover:bg-slate-50 block rounded-lg px-3 py-2 text-sm">
            {label}
          </Link>
        ))}
      </nav>
      <button onClick={logout} className="ui-btn-primary mt-4 px-4 py-2 text-sm">
        {t("logout")}
      </button>
    </aside>
  );
}
