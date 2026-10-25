"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useMaskSize, usePagesRef } from "@/app/store";

gsap.registerPlugin(ScrollTrigger, SplitText);

const services = [
  {
    title: "Frontend",
    detail:
      "Crafting responsive, accessible interfaces with React and Next.js, with thoughtful details and fluid animations that feel great to use.",
  },
  {
    title: "Backend & APIs",
    detail:
      "Building scalable backend systems using Node.js and Express, designing clean APIs, and integrating full-stack features for real-world applications.",
  },
  {
    title: "WordPress",
    detail:
      "Creating custom WordPress themes and plugins that are fast, flexible, and easy for teams to manage with confidence.",
  },
  {
    title: "Optimization",
    detail:
      "Improving performance, SEO, and maintainability so every page loads quickly, ranks well, and stays easy to build on.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRefs = useRef<HTMLHeadingElement[]>([]);
  const setServices = usePagesRef((state) => state.setServices);
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);

  useLayoutEffect(() => {
    setServices(sectionRef.current);
    return () => setServices(null);
  }, [setServices]);

  useGSAP(
    () => {
      const splits: SplitText[] = [];

      revealRefs.current.forEach((heading) => {
        if (!heading) return;
        const split = SplitText.create(heading, { type: "words" });
        splits.push(split);

        gsap.fromTo(
          split.words,
          { clipPath: "inset(-25% 100% -25% 0)" },
          {
            clipPath: "inset(-25% -2% -25% 0)",
            duration: 1,
            stagger: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              end: "top 55%",
              scrub: true,
            },
          },
        );
      });

      return () => splits.forEach((s) => s.revert());
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="services pb-14 pt-14" id="services">
      <div className="px-[8%]">
        <div className="container pb-[38px]">
          <h2 className="font-orbitron text-[1.2rem] font-semibold leading-7 text-foreground">
            What i do
          </h2>
        </div>
      </div>

      <div className="border-t border-foreground/15">
        {services.map(({ title, detail }, index) => (
          <article
            key={title}
            className="service-row group relative border-b border-foreground/15"
            onMouseEnter={() => changeMaskSize(0)}
            onMouseLeave={revertMaskSize}
          >
            {/* teal highlight, expands from the center; -inset-y-px hides the row borders */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -inset-y-px bg-gradient-to-r from-primary to-primary/35 [clip-path:inset(50%_0)] transition-[clip-path] duration-300 group-hover:[clip-path:inset(0)] group-focus-within:[clip-path:inset(0)]"
            />

            <div className="relative px-[8%]">
              <div className="container relative">
                {/* bottom layer: static dim title */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-10 flex min-h-[130px] items-center py-8"
                >
                  <h3 className="font-orbitron text-[clamp(2rem,5vw,74px)] font-bold leading-none text-white/50 transition-colors duration-300 group-hover:text-black/60 group-focus-within:text-black/60">
                    {title}
                  </h3>
                </div>

                {/* top layer: white title, revealed word by word on scroll */}
                <div className="relative z-[11] flex min-h-[130px] items-center py-8">
                  <h3
                    ref={(node) => {
                      if (node) revealRefs.current[index] = node;
                    }}
                    className="font-orbitron text-[clamp(2rem,5vw,74px)] font-bold leading-none text-white transition-colors duration-300 group-hover:text-black group-focus-within:text-black"
                  >
                    {title}
                  </h3>
                </div>

                {/* glass card: overflows the row (≈32px above and below) */}
                <div className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 md:block">
                  <div className="pointer-events-none w-[268px] translate-y-3 rounded-[20px] border border-white/20 bg-[linear-gradient(180deg,rgba(47,182,162,0.35)_0%,rgba(18,86,76,0.55)_55%,rgba(5,28,25,0.95)_100%)] px-6 pb-[26px] pt-[22px] opacity-0 shadow-[0_18px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition-[opacity,translate] duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <p className="text-[12px] leading-[17px] text-white">
                      {detail}
                    </p>
                    <button
                      type="button"
                      className="mt-4 inline-flex h-[25px] items-center rounded-full border border-white/35 bg-white/15 px-[17px] text-[11px] text-white backdrop-blur-sm transition hover:bg-white/25"
                    >
                      View more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
