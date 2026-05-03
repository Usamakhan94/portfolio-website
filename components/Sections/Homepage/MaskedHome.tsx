"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MaskedHero from "./MaskedHero";
import { useEffect, useRef } from "react";
import { useMaskSize } from "@/app/store";

const MaskedHome = () => {
  const { default: maskSize, increase, revert } = useMaskSize();
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleMaskSizeChange(maskSize);
    console.log("maskSize", maskSize);
  }, [maskSize]);

  const handleMaskSizeChange = (size: number) => {
    if (!maskRef) return;
    gsap.to(maskRef.current, {
      WebkitMaskSize: `${size}px`,
      maskSize: `${size}px`,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!maskRef) return;
    gsap.to(maskRef.current, {
      WebkitMaskSize: "20px",
      maskSize: "20px",
      duration: 0.3,
      ease: "power3.inOut",
    });
  };

  useGSAP(() => {
    const mask = maskRef.current;
    if (!mask) return;

    let viewportX = 0;
    let viewportY = 0;

    let currentX = 0;
    let currentY = 0;

    const update = () => {
      const rect = mask.getBoundingClientRect();

      const mouseX = viewportX - rect.left;
      const mouseY = viewportY - rect.top;

      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      const size = parseInt(mask.style.maskSize || "20");

      gsap.set(mask, {
        WebkitMaskPosition: `${currentX - size / 2}px ${currentY - size / 2}px`,
        maskPosition: `${currentX - size / 2}px ${currentY - size / 2}px`,
      });

      requestAnimationFrame(update);
    };

    update();

    const handleMove = (e: MouseEvent) => {
      viewportX = e.clientX;
      viewportY = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);
  return (
    <main
      ref={maskRef}
      className="absolute z-10 inset-0 bg-primary overflow-visible masked-container"
      style={{
        maskSize: "20px",
        WebkitMaskSize: "20px",

        maskPosition: `
      calc(var(--x) - var(--size) / 2) calc(var(--y) - var(--size) / 2),
      center
    `,
        WebkitMaskPosition: `
      calc(var(--x) - var(--size) / 2) calc(var(--y) - var(--size) / 2),
      center
    `,
        maskImage: "url(/cursor.svg)",
        WebkitMaskImage: "url(/cursor.svg)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <MaskedHero />
    </main>
  );
};

export default MaskedHome;
