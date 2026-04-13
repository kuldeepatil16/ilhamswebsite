import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, Flame, ShieldCheck, Sparkles, Timer, Wrench } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title: "Promotions | Vereen Electro Froid",
    description:
      "Seasonal promotions, priority service offers, and maintenance campaigns for HVAC, refrigeration, and solar systems in Morocco.",
    locale,
    path: "/promotions",
  });
}

const offers = [
  {
    tag: "Save 450",
    title: "Advanced multi-zone refrigeration",
    price: "$2,499",
    oldPrice: "$2,949",
    action: "Claim offer",
    desc: "High-capacity cold-chain systems for demanding commercial spaces.",
  },
  {
    tag: "15% OFF",
    title: "Split-system AC unit",
    price: "$899",
    oldPrice: "$1,050",
    action: "Buy now",
    desc: "Ultra-quiet cooling for premium residential spaces.",
  },
  {
    tag: "Bundle deal",
    title: "Eco-silent washing pro",
    price: "$1,150",
    oldPrice: "$1,400",
    action: "View details",
    desc: "Efficient household performance with a stronger operating margin.",
  },
];

const membership = [
  "Priority scheduling",
  "Biannual precision tuning",
  "Parts discount access",
  "Lifecycle follow-up",
];

export default function PromotionsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  return (
    <div className="ui-page">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_48%,rgb(var(--hero-end))_100%)] text-contrast">
        <div className="absolute inset-0 opacity-50">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxfAVwDySsQK8TLVGUYS7L4ixFZo7J2XAGTskjcCeuqc9tMUcbV9llret6sU5KEQtJaCQB85Tbo_kOsCt4i4pK0l5j44fiDj8ke4VC4iVbLYx0TDPpJuj8u--D2wSVHx82EDn8nMZXJSnBw_tOgHgA6gDLRF4TVlePohsQD9YG2RwGfHnoGMp-tTcUZhP17rN1HsQmXut_AJ3SLnKBT0vhB-HG3nrQEoTUxqmZ1DEMZuGeB8dIGs-lKOajQVaP4WdX594ir-d9kcgg"
            alt="Promotion hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,27,46,0.92)_0%,rgba(10,46,77,0.7)_52%,transparent_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--contrast)/0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-contrast-muted backdrop-blur">
              <Flame size={14} />
              Seasonal offers
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl xl:text-8xl font-manrope">
              Promotions and
              <span className="block bg-gradient-to-r from-secondary-container via-contrast to-accent-light bg-clip-text text-transparent">
                service campaigns
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-contrast-muted md:text-lg">
              Curated offers for summer prep, maintenance plans, and premium equipment rollouts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition hover:bg-accent-light">
                Claim priority service
                <ArrowRight size={16} />
              </Link>
              <Link href="#audit" className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur">
                Book an audit
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-[rgb(var(--contrast)/0.1)] bg-[rgb(var(--contrast)/0.08)] p-6 shadow-[0_24px_56px_rgb(var(--shadow)/0.22)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Offer ends soon</p>
                  <h2 className="mt-2 text-2xl font-black text-contrast font-manrope">Summer prep event</h2>
                </div>
                <Timer className="text-secondary-container" />
              </div>
              <div className="mt-6 grid grid-cols-4 gap-3 text-center">
                {[
                  ["08", "Days"],
                  ["14", "Hours"],
                  ["42", "Mins"],
                  ["19", "Secs"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[1.2rem] bg-[rgb(var(--contrast)/0.08)] p-3">
                    <div className="text-2xl font-black text-contrast font-manrope">{value}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-contrast-muted">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[rgb(var(--contrast)/0.08)]">
                <div className="h-full w-2/3 rounded-full bg-secondary-container" />
              </div>
              <p className="mt-3 text-center text-xs font-medium text-contrast-muted">Limited slots available for June maintenance</p>
            </div>
            <div className="rounded-[1.6rem] bg-[rgb(var(--contrast)/0.08)] p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-secondary-container" />
                <div>
                  <p className="text-sm font-semibold text-contrast">Authorized service center</p>
                  <p className="text-sm text-contrast-muted">Fast replies, clear pricing, and follow-up from the same technical team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Premium inventory</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground md:text-5xl font-manrope">Current seasonal discounts</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Selected deals built around the highest-impact equipment categories and maintenance services.
            </p>
          </div>
          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            <article className="group relative overflow-hidden rounded-[2rem] bg-surface-container-lowest p-6 shadow-card xl:col-span-2">
              <div className="absolute inset-y-0 right-0 w-2/3 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcZLbucKVSaLUljysLjAez6sbvcLUjvnPZ4KCuSvvPzoOAjMaXCv51EjFYqc3x9C1b6ZcGYG507xColsxo_qzig3OM1pV5w9AxlinYSoNR8tRfHscN53vofUDOMTSlbtU5lGr8Bsb4dOIXL4ETJoywl3aMqa_zvSgtVB0kFSGxO08Ovx_p0Oya22Ui6l5qScGl0WIlvLwfCoqkfddXbihkb6dOKSEupiFRfbkf_RLqmQ4nXq2I2VbBN3AT9VObV23N1m7E2xNxlBsL"
                  alt="Refrigeration promotion"
                  className="h-full w-full object-contain object-right-bottom opacity-90 transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative z-10 max-w-xl space-y-4">
                <span className="inline-block rounded-full bg-tertiary-container px-3 py-1 text-xs font-bold text-contrast">Save $450</span>
                <h3 className="text-3xl font-black leading-tight text-foreground font-manrope">{offers[0].title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{offers[0].desc}</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-black text-foreground">{offers[0].price}</span>
                  <span className="text-lg text-muted-foreground line-through">{offers[0].oldPrice}</span>
                </div>
                <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent-light">
                  {offers[0].action}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>

            <div className="grid gap-6">
              {offers.slice(1).map((offer) => (
                <article key={offer.title} className="rounded-[2rem] bg-surface-container-lowest p-5 shadow-card">
                  <span className="inline-block rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-secondary">{offer.tag}</span>
                  <h3 className="mt-4 text-xl font-black text-foreground">{offer.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{offer.desc}</p>
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="text-2xl font-black text-foreground">{offer.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{offer.oldPrice}</span>
                  </div>
                  <Link href={`/${locale}/contact`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                    {offer.action}
                    <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="audit" className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_100%)] p-8 text-contrast shadow-[0_24px_60px_rgb(var(--shadow)/0.18)] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Platinum access</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl font-manrope">Maintenance membership for predictable service</h2>
              <p className="mt-4 max-w-xl leading-8 text-contrast-muted">
                A preventive maintenance circle for homes and businesses that prefer priority scheduling, original parts access, and cleaner follow-through.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {membership.map((item) => (
                  <span key={item} className="rounded-full bg-[rgb(var(--contrast)/0.08)] px-4 py-2 text-xs font-semibold text-contrast-muted backdrop-blur">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-surface-container-lowest p-6 shadow-card md:p-8">
              <div className="flex items-center gap-3">
                <Wrench className="text-secondary" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Complete system wellness audit</p>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    A flat-rate inspection for HVAC, refrigeration, and solar installations.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Flat rate session</p>
                  <p className="mt-2 text-3xl font-black text-foreground">$99</p>
                </div>
                <div className="rounded-[1.4rem] border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Priority</p>
                  <p className="mt-2 text-3xl font-black text-foreground">24h</p>
                </div>
              </div>
              <Link href={`/${locale}/contact`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent-light">
                Book audit
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_100%)] p-8 text-contrast shadow-[0_24px_60px_rgb(var(--shadow)/0.18)] md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Support route</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl font-manrope">Need a quote, a maintenance plan, or a service call?</h2>
                <p className="mt-4 max-w-2xl leading-8 text-contrast-muted">
                  Send the project details and our team will respond with the right route, timeline, and parts plan.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent-light">
                  Start the conversation
                  <ArrowRight size={16} />
                </Link>
                <a href={COMPANY.whatsappUrl} className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-5 py-3 text-sm font-semibold text-contrast backdrop-blur">
                  <Sparkles size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
