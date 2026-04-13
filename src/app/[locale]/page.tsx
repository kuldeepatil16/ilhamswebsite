import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, Award, Building2, ChevronRight, ShieldCheck, Sparkles, SunMedium, Waves, Wind } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title: "Vereen Electro Froid | Thermal Architecture for Morocco",
    description:
      "Production-grade HVAC, refrigeration, solar energy, and appliance service in Al Hoceima. Premium systems, genuine parts, and reliable after-sales support.",
    locale,
    path: "/",
  });
}

const trustedBrands = ["Whirlpool", "Samsung", "Ariston", "Bosch", "AUX", "LG", "Daikin", "Carrier"];

const serviceCards = [
  {
    icon: Wind,
    title: "Air Conditioning",
    desc: "Residential splits, commercial multi-zone systems, and engineered installation support.",
  },
  {
    icon: Waves,
    title: "Refrigeration",
    desc: "Cold rooms, display cases, diagnostics, and fast-response repair for critical systems.",
  },
  {
    icon: SunMedium,
    title: "Solar Energy",
    desc: "Thermal solar water heating and hybrid systems designed to cut operating costs.",
  },
  {
    icon: Building2,
    title: "Central HVAC",
    desc: "VRF/VRV planning, air handling, and project delivery for larger facilities.",
  },
];

const metrics = [
  { value: "10+", label: "Years active" },
  { value: "2000+", label: "Clients served" },
  { value: "8", label: "Brand partners" },
  { value: "24h", label: "Response target" },
];

const products = [
  {
    name: "Whirlpool French Door Refrigerator",
    category: "Refrigeration",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLlmQp9yQTW_dYyFIqyieJLm7vFLflVF74YYm3b5PGQBL-2BssFUhxmRuKNN8t8c6UgyJdHE_5_16lFkDr4j53tp9wrT84owLsc-LvzXCPSptIih7prrYW58nAsGKPWCNcUSQIc6Xm9T1MjkvUAuO7yJO6CKRvzaMUeUUJQr30wyW4bxr4aSi-qkGEms7n4L-WRtZ9MEknkkK1XzIifpXszZ7MUgHssQXJrG_secepLbteYEmI4TNKC2PS-KR4LBtztuMK911Jho6b",
  },
  {
    name: "Samsung WindFree Split AC",
    category: "Air Conditioning",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5WmG9bM6xKBHTulfQlEt0Q04H_qTkO6KgmJjigP0bv8FMpiYuh7uu6lGOLCL6D06Tv1la45k7NajeNSCW-tPgNNw7ctvQY8weJohssp_ExeJtUegXcVGR6lYDl6gU89smPI4M-4bY_ilf-gFLouwN7elrQ2rvzeu2tWoREjkVYPvwMD7XEJ7EMGMSwi4zjY87nYoRCEBqnWXnfk4ow26BtPCg0ZJQWb1TJedQd-jQhVHGtke9qbaTJTe7MDLjd1V2wWf-RPg3UeCc",
  },
  {
    name: "Ariston Kairos Solar Water Heater",
    category: "Solar Energy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1ZvZgV4K-jLIIm650Ctntw9Tm11bMiEnPhhc_aTb6-4fLqMWyf1eEhN3Amio88fT8BvFNT-Ya1koGijvLKX2BQ5dJlkpH6HdRkXBsYZ0nzZYkPisGH2aIQXvdMA7MV-9sd8IXofkUWXoPYpOLK3miHasHOwSp6usufvtLGEZdh1SvVmn3mk-5ut-bDPZeyJY97Nh9PWAbXB0ChlSz0tjaDsCTSxTs6YZ5kh0CpuuJ-h1polEXG0bURa7958dbREj9CEYC5T8elgLH",
  },
];

const team = [
  {
    name: "Steve Reen",
    role: "Founder & Lead Architect",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2aRteCNTaBdwZhLILbn0_3Bon3lXOxEuK6jO-Pj6BZFgW2uv5tQ-_HgpMsPmA9CQhUQnuQ5pz4gnNYocc71WWlhUOAKXCOCX4Fi6dh024SLOw_vxBTiSKbAT8WtgnWXeZx_TLUonssLpQU-3PP54h7k8BALDr4L_wdqAb_7gWSTj3BRFiO7QSAUcFbvwbAK-2WF5Sg-V3caw1igs8pmCq7HPZGfnj8FfD6-lQq3DTAkBfC_ReNpSJGF58xf_-sfQOsMCAWMJzlAsN",
  },
  {
    name: "Elena Vance",
    role: "Solar Systems Engineer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKlLgbwaweVJgZJ6BRCdw0CHUWlEa8XUQ-NXlsQ2MjSmPwZUh3NYOYeHQ4bxuSTNb55uCffEpk6Gc_Vf92h28o4UAMuY8lmV3xXsoBOS27V1GTU1WaQCFDJjpSa_yWFNycD48osajryLgvzXkITYBC7m4-3ZxbqLSlM1PpZY0U7r2iI5UXAoYpbj_sTQUiVI5x7T0G9mXFfNu0lDeRyfQdsahnJeeQ8sPv5jw63DSmyW-cmCm-q2dMXrbKyaa4Uo0scQS8wz45XA2l",
  },
  {
    name: "Marcus Thorne",
    role: "HVAC Implementation Head",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYr25PBoj0bzN5O9cghM7gBpwab3t80ZzKe1YwZAdjUzqshqDw90JQwelv0Zo5fYlpmJ73QNNpi_bSYxB2XLjbSblLOqGXoMSMfRX6UtdGT_d62GEnOFzNRyFnmmKt96bly_tdQ_sdD7478ReYgRvkfbglh4fZZOb46zkEKcOrkTpefbyQXr129Qm9R7Sej91ezdWzQ97LIz1E3LGVIcnnPX_C3nCxwl8eS3yC8T9GaCX9VrATPhhHkrR5tIKcgwpb4k4uKcEoOyVr",
  },
  {
    name: "Sofia Chen",
    role: "Maintenance Logistics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2tSb4gWFtrSeNXMI3IJxRrc_IcMgfFdGEboRn5-Bs5yqTMi_U2hTbESdk_SkigjSqt5jT_E_psWZVDxqn83CTnjMgrs_56Bss9qDAC-CyzQfKlfg5ZuMmvLb7dMat1BijcGEyWPR5G8RfF75OB8PepHIDFu51P9Qm9dZGbM7ZbEwrn8XWsN3lv1Q7HC9Zgf6keKIu5To-UKyuLJwjdnLwECHLQHZ6sasqSNZlb1u05B8h86aLT9vexpC4_JdtO5U8OJnmVZ7YWqSh",
  },
];

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vereen Electro Froid",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Hoceima",
      addressLocality: "Al Hoceima",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    telephone: [COMPANY.phone1, COMPANY.phone2],
    url: "https://stevereenelectrofroid.com",
    email: COMPANY.email,
    sameAs: [COMPANY.instagramUrl],
    areaServed: "Morocco",
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air Conditioning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Refrigeration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar Energy" } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_48%,rgb(var(--hero-end))_100%)] text-contrast">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(117,252,165,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(242,138,31,0.18),transparent_30%)] opacity-90" />
        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgb(var(--contrast)/0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-contrast-muted backdrop-blur">
              <ShieldCheck size={14} />
              Thermal architecture
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.94] tracking-tight md:text-7xl xl:text-8xl font-manrope">
              Engineering
              <span className="block bg-gradient-to-r from-secondary-container via-contrast to-accent-light bg-clip-text text-transparent">
                Atmospheres
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-contrast-muted md:text-lg">
              High-performance refrigeration, HVAC, and solar systems built for homes, hospitality, and industrial workspaces across northern Morocco.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-[0_12px_28px_rgb(var(--shadow)/0.12)] transition hover:-translate-y-0.5 hover:bg-accent-light"
              >
                Explore services
                <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/promotions`}
                className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur transition hover:bg-[rgb(var(--contrast)/0.1)]"
              >
                View promotions
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Authorized sourcing",
                "Original spare parts",
                "Preventive maintenance",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--contrast)/0.08)] px-4 py-2 text-xs font-semibold text-contrast-muted backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-secondary-container/15 blur-3xl" />
            <div className="absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[rgb(var(--contrast)/0.1)] bg-[rgb(var(--contrast)/0.08)] p-5 shadow-[0_24px_56px_rgb(var(--shadow)/0.22)] backdrop-blur-xl">
              <div className="grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[1.6rem] bg-[rgb(var(--contrast)/0.1)] p-5">
                  <img src="/images/logo.svg" alt="Vereen Electro Froid" className="h-16 w-16" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted">The Thermal Architect</p>
                  <p className="mt-2 text-2xl font-black leading-tight text-contrast font-manrope">Precision cooling, heating, and service.</p>
                  <p className="mt-3 text-sm leading-6 text-contrast-muted">
                    Built for Moroccan homes, shops, and industrial spaces that need reliable climate systems and real after-sales support.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Response</p>
                    <p className="mt-2 text-2xl font-black font-manrope">24h</p>
                    <p className="mt-1 text-sm text-muted-foreground">Fast quotation and intervention follow-up.</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Coverage</p>
                    <p className="mt-2 text-2xl font-black font-manrope">Al Hoceima + Morocco</p>
                    <p className="mt-1 text-sm text-muted-foreground">Local service with national project support.</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Partners</p>
                    <p className="mt-2 text-2xl font-black font-manrope">8 brands</p>
                    <p className="mt-1 text-sm text-muted-foreground">Authorized distributor and service center network.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-surface py-6">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 lg:px-8">
          <div className="flex min-w-max items-center gap-12 animate-marquee">
            {[...trustedBrands, ...trustedBrands].map((brand, index) => (
              <span key={`${brand}-${index}`} className="text-2xl font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Operational systems</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground md:text-5xl font-manrope">
              Systems built around delivery, not decoration
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              A compact service orbit built around installation, maintenance, sourcing, and after-sales support.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className={index === 0 ? "xl:col-span-2 xl:row-span-2 rounded-[2rem] bg-surface-container-lowest p-7 shadow-card" : "rounded-[1.6rem] bg-surface-container-lowest p-6 shadow-card"}
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <span className="rounded-full bg-secondary-container/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                      Ready
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{card.desc}</p>
                  {index === 0 ? (
                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <Award size={14} className="text-accent" />
                      Installation, commissioning, and life-cycle support
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Precision line</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground md:text-5xl font-manrope">Next-generation hardware for high-performance cooling</h2>
            </div>
            <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition hover:text-secondary/80">
              View all products
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            <article className="group relative overflow-hidden rounded-[2rem] bg-surface-container-lowest p-6 shadow-card xl:col-span-2">
              <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                <img src={products[0].image} alt={products[0].name} className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105" />
              </div>
              <div className="relative z-10 max-w-xl space-y-5">
                <span className="inline-block rounded-full bg-tertiary-container px-3 py-1 text-xs font-bold text-contrast">Premium</span>
                <h3 className="text-3xl font-black leading-tight text-foreground font-manrope">{products[0].name}</h3>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{products[0].category}</p>
                <div className="flex flex-wrap gap-2">
                  {["Smart humidity control", "5-year compressor warranty", "Engineered zoning"].map((item) => (
                    <span key={item} className="rounded-full bg-muted px-3 py-2 text-xs font-semibold text-foreground">
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent-light"
                >
                  Request this system
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>

            <div className="grid gap-6">
              {products.slice(1).map((product) => (
                <article key={product.name} className="rounded-[2rem] bg-surface-container-lowest p-5 shadow-card">
                  <div className="aspect-square overflow-hidden rounded-[1.5rem] bg-surface-container-high">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <Award className="text-secondary-container" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Numbers that define reliability</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground md:text-5xl font-manrope">
                Beyond installation, we provide a lifecycle of performance monitoring and technical optimization.
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {metrics.map((item) => (
                  <div key={item.label} className="rounded-[1.4rem] bg-surface-container-lowest p-4 shadow-card">
                    <div className="text-3xl font-black text-secondary font-manrope">{item.value}</div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-secondary-container/15 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-accent/15 blur-3xl" />
              <div className="rounded-full border border-border/60 p-10 shadow-card">
                <div className="rounded-full border border-secondary/30 p-8">
                  <div className="relative overflow-hidden rounded-full bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_100%)]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC1z3cBoblrAIZwaic6C1kMXGVpb140qWPz9xzNkfZRz7dchqWFj3uBzsL4qaGgvunzHLzrt54wK5KLWBQ-6hf12GoRcH5lqqhYz6AO0-JdwLYkTuVDxH5bzfwwtDsZhv5fhD-FePDknmXIw2wLkQjF_MP_YHhMjVOmOMENqimf1ulRWbnPlj0ZKy3ZyyIccokoDCWHrE-3UEUe5VEre0QseqP1bXmoh7XYjjg5S1D_QBVD9bxzLX3tJaMQigbdCUob9iBmD_Zg7pi"
                      alt="Technician portrait"
                      className="aspect-square w-full object-cover mix-blend-overlay"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgb(var(--hero-start)/0.45)] text-center text-contrast">
                      <ShieldCheck size={48} className="mb-4 text-secondary-container" />
                      <p className="text-xl font-black uppercase tracking-tight font-manrope">Precision Guaranteed</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.24em] text-contrast-muted">Certified support and after-sales continuity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.name} className="group overflow-hidden rounded-[1.5rem] bg-surface-container-lowest p-4 shadow-card">
                <div className="aspect-square overflow-hidden rounded-[1.2rem] bg-surface-container-high">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_100%)] p-8 text-contrast shadow-[0_24px_60px_rgb(var(--shadow)/0.18)] md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Final call</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl font-manrope">Need a system review, a quote, or a seasonal check?</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-contrast-muted">
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
    </>
  );
}
