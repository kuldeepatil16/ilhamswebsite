import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, Award, CircleDot, Clock3, ShieldCheck, Sparkles, Users2, Wrench } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title: "About Vereen Electro Froid | Thermal Architecture and Service",
    description:
      "Discover Vereen Electro Froid's history, mission, values, and team. Premium HVAC, refrigeration, solar energy, and appliance service based in Al Hoceima.",
    locale,
    path: "/about",
  });
}

const values = ["Technical excellence", "Transparency", "Customer respect", "Continuous improvement", "Environmental responsibility"];
const timeline = [
  { year: "1998", title: "Foundation in electrofroid", body: "The workshop opens with a focus on refrigeration repair and local support." },
  { year: "2005", title: "Expansion into HVAC", body: "The team adds split systems, maintenance contracts, and project delivery." },
  { year: "2018", title: "Solar integration", body: "Solar water heating and hybrid energy systems are added to the service line." },
];
const team = [
  { name: "Technical audit", role: "Site assessment and sizing", icon: CircleDot },
  { name: "Installation", role: "Commissioning and handover", icon: Wrench },
  { name: "Support", role: "Preventive maintenance", icon: Clock3 },
  { name: "Quality control", role: "Warranty and follow-up", icon: ShieldCheck },
];

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  return (
    <div className="ui-page">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_55%,rgb(var(--hero-end))_100%)] text-contrast">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(117,252,165,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(242,138,31,0.16),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--contrast)/0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-contrast-muted backdrop-blur">
              <Sparkles size={14} />
              About Vereen Electro Froid
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl xl:text-8xl font-manrope">
              Built for trust,
              <span className="block bg-gradient-to-r from-secondary-container via-contrast to-accent-light bg-clip-text text-transparent">
                precision, and continuity.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-contrast-muted md:text-lg">
              A regional HVAC, refrigeration, solar, and appliance partner serving Al Hoceima and the wider north of Morocco.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#timeline" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition hover:bg-accent-light">
                Explore our timeline
                <ArrowRight size={16} />
              </Link>
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur">
                Contact the team
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-secondary-container/15 blur-3xl" />
            <div className="absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-[rgb(var(--contrast)/0.1)] bg-[rgb(var(--contrast)/0.08)] shadow-[0_24px_56px_rgb(var(--shadow)/0.22)] backdrop-blur-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUXO_yPhf62DMOE69kAYtkajVbpd-OIVuhJr9VKDkXrp2c-I9oi1Fhdvu4A9SPeTcxn8lj6A_4waATHiDfS6NZwugtEfEoGVXxpWUYbvFySfnpN-lYyWQb-8A-4PK4o5h3PY9nUF_-Zx01XFqAS8gZnoFAPJ6uFrbs8aEHBMAOfveGUnOWeFV05LcOaPh-E8SbBtxkC4gpF_0tjhO6L7uuj9kdKQDeVblng7wgdg3_pgjJkGaVtjA1NpEoZxQ713QtdR5jGaNeAnbz"
                alt="Industrial cooling systems"
                className="h-[520px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 hidden rounded-[1.4rem] bg-surface p-5 shadow-card lg:block">
              <div className="flex items-center gap-3">
                <Award className="text-secondary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Certified precision</p>
                  <p className="text-xs text-muted-foreground">Authorized service and technical support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-[1.6rem] border border-border bg-surface-container-low p-6">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-surface">
                <Award className="text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Mission</h2>
              <p className="mt-3 leading-8 text-muted-foreground">
                Deliver dependable thermal systems, genuine parts, and follow-through that keeps equipment running and customers informed.
              </p>
            </article>
            <article className="rounded-[1.6rem] border border-border bg-surface-container-low p-6">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-surface">
                <ShieldCheck className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Vision</h2>
              <p className="mt-3 leading-8 text-muted-foreground">
                Become the reference independent service platform for HVAC and appliances across Morocco.
              </p>
            </article>
            <article className="rounded-[1.6rem] border border-border bg-surface-container-low p-6">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-surface">
                <Users2 className="text-secondary-container" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Coverage</h2>
              <p className="mt-3 leading-8 text-muted-foreground">
                Primary coverage in Al Hoceima with projects and service support across northern Morocco.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="timeline" className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">A legacy of stability</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground md:text-5xl font-manrope">A history shaped by technical continuity</h2>
          </div>
          <div className="mt-12 space-y-10">
            {timeline.map((item) => (
              <div key={item.year} className="grid gap-4 md:grid-cols-[180px_24px_1fr] md:items-center">
                <div className="text-5xl font-black tracking-tight text-surface-container-highest">{item.year}</div>
                <div className="relative hidden h-20 md:block">
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
                  <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent" />
                </div>
                <div className="rounded-[1.6rem] border border-border bg-surface-container-low p-6">
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 leading-8 text-muted-foreground">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_100%)] p-8 text-contrast shadow-[0_24px_60px_rgb(var(--shadow)/0.18)] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Core philosophy</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl font-manrope">A company built around trust, precision, and continuity.</h2>
            <p className="mt-4 max-w-xl leading-8 text-contrast-muted">
              From installation to preventive maintenance, every service is designed to keep the support chain simple and the operating environment stable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {values.map((value) => (
                <span key={value} className="rounded-full bg-[rgb(var(--contrast)/0.08)] px-4 py-2 text-xs font-semibold text-contrast-muted backdrop-blur">
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {team.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.name} className="rounded-[1.6rem] border border-border bg-surface-container-low p-6">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-surface">
                    <Icon className="text-accent" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">{item.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.role}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-surface-container-lowest p-8 shadow-card md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Team and coverage</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-5xl font-manrope">Certified team, regional coverage</h2>
                <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
                  Our technicians are trained to work as one delivery system, with coverage built around Al Hoceima and northern Morocco.
                </p>
              </div>
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent-light">
                Contact the team
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
