"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMaskSize, usePagesRef } from "@/app/store";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  { year: "2026", title: "Senior Web Developer", company: "Online Marketing Bakery · OMB", detail: "Building polished, high-performing websites and digital experiences." },
  { year: "2025", title: "Lead Developer", company: "Webmax", detail: "Leading frontend delivery and turning design systems into reliable products." },
  { year: "2024", title: "Web Developer", company: "Tahsil PVT", detail: "Creating responsive web experiences for a range of client needs." },
  { year: "2023", title: "Front End Developer", company: "Jinch", detail: "Bringing product ideas to life through thoughtful interface development." },
  { year: "2022", title: "Senior Web Developer", company: "Online Marketing Bakery · OMB", detail: "Developing modern websites with a focus on quality and performance." },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLElement[]>([]);
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);
  const setExperience = usePagesRef((state) => state.setExperience);
  useLayoutEffect(() => {
    setExperience(sectionRef.current);
    return () => setExperience(null);
  }, [setExperience]);
  useGSAP(() => {
    rowsRef.current.forEach((row, index) => gsap.fromTo(row, { x: -20, autoAlpha: 0 }, {
      x: 0, autoAlpha: 1, duration: 0.55, delay: index * 0.05, ease: "power2.out",
      scrollTrigger: { trigger: row, start: "top 88%", once: true },
    }));
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="experience border-y border-primary/10 bg-gradient-to-b from-[#07100e] to-[#09231e] py-20 md:py-28" id="experience">
      <div className="mx-auto max-w-6xl px-[8%]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3 text-primary"><span className="font-orbitron text-[10px]">04</span><h2 className="font-orbitron text-xs font-semibold uppercase tracking-widest text-foreground">Experience</h2></div>
          <p className="experience-intro-copy max-w-2xl font-orbitron text-[clamp(1rem,2vw,1.4rem)] font-semibold uppercase leading-relaxed text-foreground/80">Years of experience building modern websites and digital experiences with talented teams and brands.</p>
        </div>
        <div className="ml-12 border-l border-primary/50 md:ml-16">
          {roles.map((role, index) => (
            <article className="relative grid min-h-[76px] grid-cols-1 items-center gap-1 border-b border-white/10 py-3 pl-4 md:min-h-[84px] md:grid-cols-[1fr_minmax(200px,.8fr)] md:gap-5 md:pl-6" ref={(node) => { if (node) rowsRef.current[index] = node; }} onMouseEnter={() => changeMaskSize(180)} onMouseLeave={revertMaskSize} key={role.year}>
              <span className="absolute -left-[51px] font-orbitron text-[11px] font-semibold text-primary md:-left-[67px] md:text-sm">{role.year}</span>
              <span className="absolute -left-[7px] size-3 rounded-full border-[3px] border-[#0b1512] bg-primary" />
              <div><h3 className="font-orbitron text-xs font-semibold md:text-sm">{role.title}</h3><p className="mt-1 text-[10px] text-foreground/50">{role.company}</p></div>
              <p className="hidden max-w-sm text-[11px] leading-5 text-foreground/50 md:block">{role.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


