"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMaskSize, usePagesRef } from "@/app/store";

gsap.registerPlugin(ScrollTrigger);

const skills = ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "WordPress", "GSAP", "Tailwind CSS"];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);
  const setSkills = usePagesRef((state) => state.setSkills);

  useLayoutEffect(() => {
    setSkills(sectionRef.current);
    return () => setSkills(null);
  }, [setSkills]);

  useGSAP(() => {
    gsap.fromTo(itemsRef.current, { y: 20, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="toolkit mx-auto grid max-w-6xl items-center gap-8 px-[8%] py-20 md:grid-cols-[.8fr_1.2fr] md:gap-14 md:py-28" id="skills">
      <div className="relative flex min-h-56 flex-col items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(47,182,162,.18),transparent_65%)] md:min-h-80">
        <div className="absolute h-96 w-44 rotate-[-26deg] rounded-full border border-primary/20" />
        <div className="absolute h-[30rem] w-28 rotate-[26deg] rounded-full border border-primary/15" />
        <div className="relative font-orbitron text-[clamp(5rem,11vw,8rem)] font-extrabold tracking-[-.16em] text-primary [text-shadow:0_0_60px_rgba(47,182,162,.28)]"><span>&lt;</span><span className="-translate-y-2 text-foreground">/</span><span>&gt;</span></div>
        <p className="relative text-center font-orbitron text-xs leading-6 text-foreground/60">Tools for making<br />good ideas real.</p>
      </div>
      <div>
        <div className="mb-3 flex items-center gap-3 text-primary"><span className="font-orbitron text-[10px]">05</span><h2 className="font-orbitron text-xs font-semibold uppercase tracking-widest text-foreground">Skills</h2></div>
        <p className="toolkit-intro mb-5 text-xs leading-6 text-foreground/55">A flexible toolkit for building fast, accessible, and memorable experiences.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {skills.map((skill, index) => (
            <div className="skill-item flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/[.035] px-3 transition hover:border-primary/40 hover:bg-primary/[.06]" ref={(node) => { if (node) itemsRef.current[index] = node; }} onMouseEnter={() => changeMaskSize(220)} onMouseLeave={revertMaskSize} key={skill}>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 font-orbitron text-[9px] text-primary">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-orbitron text-[10px] font-semibold sm:text-xs">{skill}</span>
              <span className="ml-auto text-[8px] text-primary/60">✳</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
