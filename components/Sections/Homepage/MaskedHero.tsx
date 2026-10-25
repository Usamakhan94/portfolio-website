"use client";

import { useMaskSize, usePagesRef } from "@/app/store";
import TextReveal from "@/components/ui/TextReveal";

const details = [
  "Backlog Bugistan",
  "Overthinking in Frontend Development",
  "4+ Years Regression",
];

export default function MaskedHero() {
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);
  const home = usePagesRef((state) => state.home);

  return (
    <section
      className="hero relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-[5%] pb-24 pt-20 text-center"
      style={{ height: home?.offsetHeight ?? 0 }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center">
        <span className="inline-flex items-center rounded-full border border-black/20 bg-black/5 px-5 py-2 text-[10px] font-medium tracking-wide text-black">
          Usama Khan
        </span>
        <h1
          onMouseEnter={() => changeMaskSize(400)}
          onMouseLeave={revertMaskSize}
          className="mt-7 max-w-[760px] cursor-none font-orbitron text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.16] tracking-tight text-black"
        >
          <TextReveal>
            Turning Muffin into<br />Bugs And Bugs into<br />Features
          </TextReveal>
        </h1>
      </div>
      <div className="hero-meta absolute inset-x-[5%] bottom-8 z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-orbitron text-[16px] font-medium text-black/90">
        {details.map((detail) => <span key={detail}>{detail}</span>)}
      </div>
    </section>
  );
}
