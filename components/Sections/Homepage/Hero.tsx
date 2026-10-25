"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useMaskSize, usePagesRef } from "@/app/store";
import TextReveal from "@/components/ui/TextReveal";
import LineWaves from "@/components/LineWaves";

gsap.registerPlugin(ScrollTrigger, SplitText);

const details = [
  "Karachi Pakistan",
  "Specializing in Frontend Development",
  "4+ Years Experience",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);
  const setHome = usePagesRef((state) => state.setHome);

  useLayoutEffect(() => {
    setHome(sectionRef.current);
    return () => setHome(null);
  }, [setHome]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-meta span",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.15,
          delay: 0.4,
          ease: "power3.out",
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="hero relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-[5%] pb-24 pt-20 text-center"
      id="home"
    >
      <LineWaves
        className="absolute inset-0 z-0 opacity-70"
        speed={0.3}
        innerLineCount={29}
        outerLineCount={36}
        warpIntensity={0.3}
        rotation={-59}
        edgeFadeWidth={0}
        colorCycleSpeed={0.9}
        brightness={0.2}
        color1="#155047"
        color2="#155047"
        color3="#2FB6A2"
        enableMouseInteraction
        mouseInfluence={0.3}
      />
      <div className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-64 w-[80%] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
      <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center">
        <span className="inline-flex items-center rounded-full border border-primary/50 bg-black/45 px-5 py-2 text-[10px] font-medium tracking-wide text-foreground">
          Usama Khan
        </span>
        <h1
          onMouseEnter={() => changeMaskSize(400)}
          onMouseLeave={revertMaskSize}
          className="mt-7 max-w-[760px] cursor-none font-orbitron text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.16] tracking-tight text-foreground"
        >
          <TextReveal>
            Turning Coffee into
            <br />
            Code And Bugs into
            <br />
            Features
          </TextReveal>
        </h1>
      </div>
      <div className="hero-meta absolute inset-x-[5%] bottom-8 z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-orbitron text-[16px] font-medium text-foreground/90">
        {details.map((detail) => (
          <span
            onMouseEnter={() => changeMaskSize(100)}
            onMouseLeave={revertMaskSize}
            key={detail}
          >
            {detail}
          </span>
        ))}
      </div>
    </section>
  );
}
