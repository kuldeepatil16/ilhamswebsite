import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, Award, ShieldCheck, Sparkles, Users2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title: "About Vereen Electro Froid | HVAC and Service",
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

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  return (
    <div className="ui-page">
      <section className="ui-hero-shell">
        <div className="absolute inset-0 ui-hero-grid" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="ui-hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
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
            <div className="ui-hero-surface ui-hero-ring overflow-hidden rounded-[2rem]">
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
                <Users2 className="text-accent" />
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
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Technical excellence</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground md:text-5xl font-manrope">Precision work, solar integration, and industrial service</h2>
            </div>
          </div>
              <div className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2">
            <article className="group relative overflow-hidden rounded-[1.6rem] md:col-span-2 md:row-span-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrwsLbm1OjAzx-jBhhpewimpVnAvZgL5BXMxOGb7BNylMMgd9_HU6UUqauPsCfXJqkXscMQQ67sBDbd3XZMMi2IqjeHk3Z9BTyYO00eMJ25w3ndgts-OXlnwG6W2ANKwVhIArssOauUKSCx8Ez6U6PP9Tcnat9R1KZzOoIVQedY2XhsZN593H3nVGdRMJfNt_Eu5N2xTaB9HX70HGbdyDBVD36BhZ0NAKm3wCfky7dGbKzp_duJ6dvKSzeX_qKB3m3SO3tiqUoSzyv"
                alt="Solar farm"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="ui-hero-fade absolute inset-0 flex items-end p-6 text-contrast">
                <div>
                  <h3 className="text-2xl font-black font-manrope">Renewable thermal grids</h3>
                  <p className="text-sm text-contrast-muted">Solar-powered cold storage engineering.</p>
                </div>
              </div>
            </article>
            <article className="group relative overflow-hidden rounded-[1.6rem] md:col-span-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUA3F32Bd8tV0VpSnjpZcJ-LWMftzM7CzAI6X5gz-J34_NSU7yTs1pUl0Lx6GIHKa8mPma4LkzSApM2_6HEtsGc_UrNlAh9mI9LI2tZ1jUhfjAX_bcw3MPQdKPAbHNzYzJOS68CocRFCTYXJzleFSQyDg2_5T6UR0RE-coDlZ7MF7kIub6gEQPC2TrkprYX4_JFPqDwuRm0wBb14YN3zO_VKhU42PdHQ5VLGOCSkmHfXX_0DK7zI8BpES4qh2_zirWzhjHEqpp8uhT"
                alt="Industrial chillers"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="ui-hero-fade absolute inset-0 flex items-end p-6 text-contrast">
                <div>
                  <h3 className="text-xl font-black font-manrope">Cold-chain logistics</h3>
                  <p className="text-sm text-contrast-muted">Precision temperature control for pharmaceuticals.</p>
                </div>
              </div>
            </article>
            <article className="group relative overflow-hidden rounded-[1.6rem]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ38onbCaP1Ou-YNQHQ74u3HFp2h7E4D9hmPuzS8ya-m-utPTZZ6PvuHYhYvJT7xwpzDXqJ64FYQWXJBT81SB-wUMYbsw2ElVtk-dUv4kbDQFF5um2R4QkD6eRY9R9SBVGKV8QiCBR5Ou8SQctEpPoyDCcANWKwt0OOTUS6AAVbdkHOM4wLk7gRdiJ-kgR0G9eqBSSAnAAb0GPqgeKkYfmKKKb6g0mfxIgP_IvjkPFzSniY91Ph-8MbezdjYLLr66EyPUNnowJP3Nt"
                alt="Welding precision"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </article>
            <article className="group relative overflow-hidden rounded-[1.6rem]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChQiFUgI6bq6DUmD3zxgWxaMfjYQLH_0Mr1VVVDxJxeviHFcADuAhCQirjLEirmH9Qys23NCDCGxPCg16NQTeZ0gC9xhaJEEv4w73LtpH6ezXYnrBKxUksufTto10AiMR9h_pcha6CZmiWg3-ruomHnlw3Z0OTwVt_NeefEmm56g2UYNdd1cqNtFCcndGfKKxxVH7WxsGVrAek0sLlxMOebowuHb4OubPPL3p4Nl1JIl6lVMAGMsNKUk3juDGxbk6MWjxK-JPwiFIr"
                alt="Tech analysis"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </article>
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="ui-hero-shell ui-hero-ring rounded-[2rem] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Core philosophy</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl font-manrope">A company built around trust, precision, and continuity.</h2>
            <p className="mt-4 max-w-xl leading-8 text-contrast-muted">
              From installation to preventive maintenance, every service is designed to keep the support chain simple and the operating environment stable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {values.map((value) => (
                <span key={value} className="ui-hero-chip rounded-full px-4 py-2 text-xs font-semibold">
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {team.map((item) => {
              return (
                <article key={item.name} className="group overflow-hidden rounded-[1.6rem] border border-border bg-surface-container-low shadow-card">
                  <div className="aspect-square overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{item.role}</p>
                  </div>
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
