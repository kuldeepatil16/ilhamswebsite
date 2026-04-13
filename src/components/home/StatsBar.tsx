"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { STATS } from "@/lib/constants";

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(end * progress));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-4xl font-black text-accent md:text-5xl font-manrope">
      {value}
      {suffix}
    </div>
  );
}

export default function StatsBar() {
  const t = useTranslations("stats");

  return (
    <section className="ui-page py-10">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
        {STATS.map((item) => (
          <div
            key={item.key}
            className="rounded-[1.5rem] border border-border/70 bg-surface-container-lowest/80 p-5 shadow-[0_18px_40px_rgba(17,28,45,0.06)]"
          >
            <Counter end={item.value} suffix={item.suffix} />
            <p className="mt-2 text-sm text-muted-foreground">{t(item.key as never)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
