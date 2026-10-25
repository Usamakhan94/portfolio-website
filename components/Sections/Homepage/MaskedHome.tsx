"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useMaskSize, usePagesRef } from "@/app/store";
import MaskedHero from "@/components/Sections/Homepage/MaskedHero";
import MaskedAbout from "@/components/Sections/Homepage/MaskedAbout";
import MaskedServices from "@/components/Sections/Homepage/MaskedServices";
import MaskedWork from "@/components/Sections/Homepage/MaskedWork";
import MaskedExperience from "@/components/Sections/Homepage/MaskedExperience";
import MaskedSkills from "@/components/Sections/Homepage/MaskedSkills";
import MaskedTestimonials from "@/components/Sections/Homepage/MaskedTestimonials";
import MaskedContact from "@/components/Sections/Homepage/MaskedContact";
import MaskedFooter from "@/components/Sections/Homepage/MaskedFooter";

export default function MaskedHome() {
  const main = usePagesRef((state) => state.main);
  const maskSize = useMaskSize((state) => state.default);
  const maskRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!main) return;
    const syncHeight = () => setHeight(main.offsetHeight);
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(main);
    window.addEventListener("resize", syncHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, [main]);

  useGSAP(() => {
    const mask = maskRef.current;
    if (!mask) return;

    let pointerX = -1000;
    let pointerY = -1000;
    let currentX = pointerX;
    let currentY = pointerY;
    let currentSize = useMaskSize.getState().default;
    let frame = 0;

    const handleMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const update = () => {
      const rect = mask.getBoundingClientRect();
      const targetSize = useMaskSize.getState().default;

      currentX += (pointerX - rect.left - currentX) * 0.18;
      currentY += (pointerY - rect.top - currentY) * 0.18;
      currentSize += (targetSize - currentSize) * 0.12; // size easing

      const x = currentX - currentSize / 2;
      const y = currentY - currentSize / 2;

      mask.style.maskSize = `${currentSize}px ${currentSize}px`;
      mask.style.setProperty(
        "-webkit-mask-size",
        `${currentSize}px ${currentSize}px`,
      );
      mask.style.maskPosition = `${x}px ${y}px`;
      mask.style.setProperty("-webkit-mask-position", `${x}px ${y}px`);

      frame = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMove);
    frame = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={maskRef}
      className="masked-container mask-copy"
      aria-hidden="true"
      style={{
        height,
        maskSize: `${maskSize}px`,
        WebkitMaskSize: `${maskSize}px`,
        maskImage: "url(/cursor.svg)",
        WebkitMaskImage: "url(/cursor.svg)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <MaskedHero />
      <MaskedAbout />
      <MaskedServices />
      <MaskedWork />
      <MaskedExperience />
      <MaskedSkills />
      <MaskedTestimonials />
      <MaskedContact />
      <MaskedFooter />
    </div>
  );
}
