"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { useMaskSize } from "@/app/store";

const MenuScene = dynamic(() => import("./MenuScene"), { ssr: false });

const items = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export default function SiteHeader({ masked = false }: { masked?: boolean }) {
  const changeMaskSize = useMaskSize((s) => s.change);
  const revertMaskSize = useMaskSize((s) => s.revert);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [sceneOn, setSceneOn] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLSpanElement>(null);
  const midRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);
  const hoveredRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useGSAP(
    () => {
      if (!mounted || masked || !rootRef.current || !panelsRef.current) return;

      gsap.set(topRef.current, { y: -7 });
      gsap.set(midRef.current, { y: 0 });
      gsap.set(botRef.current, { y: 7 });

      // entrance: lines slide in from the right, staggered
      gsap.fromTo(
        [topRef.current, midRef.current, botRef.current],
        { xPercent: 100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.4,
          ease: "power3.out",
        },
      );

      const links = rootRef.current.querySelectorAll(".menu-link-inner");
      const fades = rootRef.current.querySelectorAll(".menu-fade");

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.inOut" },
        onReverseComplete: () => setSceneOn(false),
      });

      tl.set(rootRef.current, { autoAlpha: 1, pointerEvents: "auto" }, 0)
        // 1. panels slide down
        .fromTo(
          panelsRef.current.children,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.8, stagger: 0.07 },
          0,
        )
        // 2. burger -> X (middle line collapses away)
        .to(topRef.current, { y: 0, rotate: 45, duration: 0.6 }, 0.1)
        .to(botRef.current, { y: 0, rotate: -45, duration: 0.6 }, 0.1)
        .to(
          midRef.current,
          { scaleX: 0, opacity: 0, duration: 0.3, ease: "power2.in" },
          0.1,
        )
        // 3. particle scene fades in once panels cover the screen
        .fromTo(
          sceneRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          0.9,
        )
        // 4. links rise out of their masks
        .fromTo(
          links,
          { yPercent: 120, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
          0.55,
        )
        // 5. footer fades in
        .fromTo(
          fades,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.8,
        );

      tlRef.current = tl;
      return () => {
        tl.kill();
      };
    },
    { dependencies: [mounted, masked] },
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    openRef.current = open;
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      setSceneOn(true);
      tl.timeScale(1).play();
    } else if (tl.progress() > 0) {
      tl.timeScale(1.6).reverse();
      gsap.to(midRef.current, {
        width: hoveredRef.current ? 28 : 18,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverBurger = (hovered: boolean) => {
    hoveredRef.current = hovered;
    if (openRef.current) return;
    // middle line grows to full width, outer lines nudge in a wave
    gsap.to(midRef.current, {
      width: hovered ? 28 : 18,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to([topRef.current, botRef.current], {
      keyframes: { x: [0, hovered ? -4 : 4, 0], easeEach: "power2.out" },
      duration: 0.5,
      stagger: 0.06,
    });
  };

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const burgerLines = (
    <>
      <span
        ref={masked ? undefined : topRef}
        className="absolute right-0 top-[15px] h-[1.5px] w-7 bg-current"
        style={masked ? { transform: "translateY(-7px)" } : undefined}
      />
      <span
        ref={masked ? undefined : midRef}
        className="absolute right-0 top-[15px] h-[1.5px] w-[18px] bg-current"
      />
      <span
        ref={masked ? undefined : botRef}
        className="absolute right-0 top-[15px] h-[1.5px] w-7 bg-current"
        style={masked ? { transform: "translateY(7px)" } : undefined}
      />
    </>
  );

  return (
    <>
      <header
        onMouseEnter={() => changeMaskSize(220)}
        onMouseLeave={revertMaskSize}
        className="site-header absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between bg-transparent px-[9%] md:h-20"
      >
        <a className="font-orbitron text-sm font-semibold" href="#home">
          Dev Portfolio
        </a>
        <div className="relative h-8 w-7">{masked && burgerLines}</div>
      </header>

      {mounted &&
        !masked &&
        createPortal(
          <>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              onMouseEnter={() => hoverBurger(true)}
              onMouseLeave={() => hoverBurger(false)}
              className="fixed right-[9%] top-4 z-[80] h-8 w-7 text-white mix-blend-difference md:top-6 cursor-pointer"
            >
              {burgerLines}
            </button>

            <div
              ref={rootRef}
              className="invisible pointer-events-none fixed inset-0 z-[70] overflow-hidden"
            >
              <div ref={panelsRef} className="absolute inset-0 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full flex-1 border-r border-white/5 bg-[#050807]"
                  />
                ))}
              </div>

              <div
                ref={sceneRef}
                className="pointer-events-none absolute inset-0 opacity-0"
              >
                <MenuScene active={active} open={sceneOn} />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between px-[9%] pb-10 pt-24">
                <ul className="group/list flex flex-col">
                  {items.map(([label, href], i) => (
                    <li
                      key={href}
                      className="w-fit transition-opacity duration-300 group-hover/list:opacity-25 hover:opacity-100!"
                      onMouseEnter={() => setActive(i)}
                    >
                      <a
                        href={href}
                        onClick={(e) => go(e, href)}
                        className="group flex items-start gap-4 overflow-hidden py-1 pr-5"
                      >
                        <span className="menu-link-inner flex items-start gap-4">
                          <span className="mt-3 font-orbitron text-xs text-primary">
                            0{i + 1}
                          </span>
                          <span className="font-orbitron text-[clamp(2.2rem,8vw,6rem)] font-bold uppercase leading-[1.05] tracking-tight text-white transition-all duration-500 group-hover:translate-x-4 group-hover:text-primary">
                            {label}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-end justify-between gap-6 text-sm text-white/60">
                  <a
                    href="mailto:usamakhan@gmail.com"
                    className="menu-fade transition hover:text-primary"
                  >
                    usamakhan@gmail.com
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => go(e, "#contact")}
                    className="menu-fade flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-xs text-white transition hover:bg-primary hover:text-black"
                  >
                    Let’s talk <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
