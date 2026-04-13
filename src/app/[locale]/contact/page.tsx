import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, Building2, Mail, MapPin, PhoneCall, Sparkles, Wrench } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/contact" });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("contact");

  const contactCards = [
    { icon: PhoneCall, label: t("phone"), value: COMPANY.phone1 },
    { icon: Mail, label: t("email"), value: COMPANY.email },
    { icon: MapPin, label: "Address", value: t("addressFull") },
    { icon: Building2, label: "Coverage", value: "Al Hoceima and northern Morocco" },
  ];

  return (
    <div className="ui-page">
      <section className="ui-hero-shell">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxfAVwDySsQK8TLVGUYS7L4ixFZo7J2XAGTskjcCeuqc9tMUcbV9llret6sU5KEQtJaCQB85Tbo_kOsCt4i4pK0l5j44fiDj8ke4VC4iVbLYx0TDPpJuj8u--D2wSVHx82EDn8nMZXJSnBw_tOgHgA6gDLRF4TVlePohsQD9YG2RwGfHnoGMp-tTcUZhP17rN1HsQmXut_AJ3SLnKBT0vhB-HG3nrQEoTUxqmZ1DEMZuGeB8dIGs-lKOajQVaP4WdX594ir-d9kcgg"
            alt="Contact and service desk"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 ui-hero-overlay" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="ui-hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
              <Sparkles size={14} />
              Contact and support
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.94] tracking-tight md:text-7xl xl:text-8xl font-manrope">{t("title")}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-contrast-muted md:text-lg">{t("subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition hover:bg-accent-light"
              >
                Explore services
                <ArrowRight size={16} />
              </Link>
              <a
                href={COMPANY.whatsappUrl}
                className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur"
              >
                <Wrench size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-secondary-container/15 blur-3xl" />
            <div className="absolute -bottom-10 right-2 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="ui-hero-surface ui-hero-ring rounded-[2rem] p-5">
              <div className="grid gap-4 md:grid-cols-[0.98fr_1.02fr]">
                <div className="ui-hero-chip rounded-[1.6rem] p-5">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[rgb(var(--contrast)/0.12)]">
                    <MapPin className="text-secondary-container" size={24} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted">Visit us</p>
                  <p className="mt-2 text-2xl font-black leading-tight text-contrast font-manrope">Al Hoceima, Morocco</p>
                  <p className="mt-3 text-sm leading-6 text-contrast-muted">
                    The workshop, dispatch point, and customer service desk operate from the same support team.
                  </p>
                </div>
                <div className="grid gap-3">
                  {contactCards.slice(0, 3).map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                          <Icon size={14} />
                          {item.label}
                        </div>
                        <p className="mt-2 text-sm font-semibold leading-6">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-page py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="grid gap-6">
            <div className="ui-surface rounded-[2rem] border border-border/80 p-6 shadow-card">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.label} className="rounded-[1.4rem] border border-border/70 bg-surface-container-lowest p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        <Icon size={14} />
                        {item.label}
                      </div>
                      <p className="mt-3 text-sm leading-7 text-foreground">{item.value}</p>
                    </article>
                  );
                })}
              </div>
              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-border/70">
                <iframe
                  src={`https://maps.google.com/maps?q=${COMPANY.geo.lat},${COMPANY.geo.lng}&z=14&output=embed`}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Map"
                />
              </div>
            </div>

            <div className="ui-hero-shell ui-hero-ring rounded-[2rem] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Response route</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl font-manrope">Fast support, original parts, and service follow-up</h2>
              <p className="mt-4 leading-8 text-contrast-muted">
                Send the equipment type, issue details, and location. The team will route you to the correct service path and next steps.
              </p>
            </div>
          </div>

          <div className="ui-surface rounded-[2rem] border border-border/80 p-6 shadow-card md:p-8">
            <ContactForm sourcePage="contact-page" />
          </div>
        </div>
      </section>
    </div>
  );
}
