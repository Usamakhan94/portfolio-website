"use client";

import { useEffect, useRef } from "react";
import TextReveal from "../../ui/TextReveal";
import { useMaskSize, usePagesRef } from "@/app/store";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setHome } = usePagesRef();
  const { change, revert } = useMaskSize();

  useEffect(() => {
    setHome(containerRef.current);
  }, [setHome]);

  const cummaryDetails = [
    "Karachi Pakistan",
    "Specializing in Frontend Development",
    "4+ Years Experience",
  ];

  const maskContainerCss =
    "max-w-[58%] mx-auto flex flex-col items-center relative pt-36 pb-43.75";

  return (
    <section
      ref={containerRef}
      id="heroSection"
      className="overflow-hidden relative isolate"
    >
      <div className="absolute left-1/2 top-0 bg-linear-to-r from-[#291A30] via-[#101B39] via-[#044568] via-[#062B43] to-[#291A30] blur-[120px] opacity-70 -translate-x-1/2 -translate-y-17 w-[90%] h-52.5 rounded-[100px]  -z-5 animate-glow" />
      <div className="relative">
        <div className={maskContainerCss}>
          <span className="uppercase tracking-widest text-center text-white text-[24px] font-semibold font-orbitron underline pb-4">
            Usama Khan
          </span>
          <h1
            onMouseOver={() => change(400)}
            onMouseLeave={revert}
            className="text-3xl text-primary font-bold text-center font-orbitron leading-[1.12]"
          >
            <TextReveal>
              Turning Coffee Into Code And Bugs Into Features
            </TextReveal>
          </h1>
        </div>
        <div className="max-w-[80%] mx-auto flex justify-between items-center pb-10">
          {cummaryDetails.map((item, index) => (
            <span
              key={index + 1}
              className="text-white font-bold font-orbitron"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
