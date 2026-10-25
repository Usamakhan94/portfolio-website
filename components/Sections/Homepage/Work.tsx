"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { FiImage } from "react-icons/fi";
import { useMaskSize, usePagesRef } from "@/app/store";

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = [
  {
    title: "Optimization",
    detail:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.",
    tags: ["Home", "Home", "Home", "Home", "Home", "Home"],
  },
  {
    title: "Optimization",
    detail:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.",
    tags: ["Home", "Home", "Home", "Home", "Home", "Home"],
  },
  {
    title: "Optimization",
    detail:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.",
    tags: ["Home", "Home", "Home", "Home", "Home", "Home"],
  },
];

const pill =
  "flex h-[26px] items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 text-[11px] text-white backdrop-blur-sm";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const setWork = usePagesRef((state) => state.setWork);
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);

  useLayoutEffect(() => {
    setWork(sectionRef.current);
    return () => setWork(null);
  }, [setWork]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const splits: SplitText[] = [];
      const cleanups: (() => void)[] = [];

      // heading
      const headSplit = SplitText.create(".work-heading", {
        type: "chars",
        mask: "chars",
      });
      splits.push(headSplit);
      gsap.from(headSplit.chars, {
        yPercent: 120,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ".work-heading", start: "top 90%" },
      });

      const rows = gsap.utils.toArray<HTMLElement>(".work-row");
      const imgs: HTMLElement[] = [];

      rows.forEach((row) => {
        const q = gsap.utils.selector(row);
        const img = q(".work-img")[0] as HTMLElement;
        const inner = q(".work-inner")[0];
        const par = q(".work-parallax")[0];
        const stroke = q(".work-stroke")[0];
        const scan = q(".work-scan")[0];
        const card = q(".work-card")[0];
        const glow = q(".work-glow")[0];
        const label = q(".work-label")[0];
        const pills = q(".work-pill");
        imgs.push(img);

        const titleSplit = SplitText.create(q(".work-title")[0], {
          type: "chars",
          mask: "chars",
        });
        const descSplit = SplitText.create(q(".work-desc")[0], {
          type: "words",
        });
        splits.push(titleSplit, descSplit);

        gsap.set(img, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });
        gsap.set(par, { transformPerspective: 900 });

        // ---- main scrubbed timeline ----
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            end: "top 28%",
            scrub: 1,
          },
        });

        tl
          // 1. slanted two-stage wipe on the image box
          .to(
            img,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 62% 100%, 0% 100%)",
              duration: 0.55,
              ease: "power2.out",
            },
            0,
          )
          .to(
            img,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 0.55,
              ease: "power2.inOut",
            },
            0.5,
          )
          // 2. media un-zooms, un-rotates and un-blurs
          .fromTo(
            inner,
            { scale: 1.6, rotate: 6, filter: "blur(14px)" },
            {
              scale: 1,
              rotate: 0,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power3.out",
            },
            0,
          )
          // 3. outline draws itself
          .fromTo(
            stroke,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1, ease: "none" },
            0.2,
          )
          // 4. scan line sweeps down the image
          .fromTo(
            scan,
            { top: "-25%", opacity: 1 },
            { top: "120%", duration: 1, ease: "power1.inOut" },
            0.1,
          )
          .to(scan, { opacity: 0, duration: 0.15 }, 1)
          // 5. card swings in on a 3D hinge
          .fromTo(
            card,
            {
              x: 90,
              rotateY: -28,
              opacity: 0,
              transformPerspective: 1000,
              transformOrigin: "left center",
            },
            { x: 0, rotateY: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.25,
          )
          .fromTo(
            glow,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
            0.4,
          )
          .fromTo(
            label,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4 },
            0.45,
          )
          // 6. title characters flip up out of their masks
          .from(
            titleSplit.chars,
            {
              yPercent: 120,
              rotateX: -80,
              transformOrigin: "50% 100%",
              stagger: 0.04,
              duration: 0.6,
              ease: "back.out(1.6)",
            },
            0.5,
          )
          // 7. description resolves word by word out of blur
          .fromTo(
            descSplit.words,
            { opacity: 0.1, filter: "blur(4px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              stagger: 0.015,
              duration: 0.4,
              ease: "none",
            },
            0.65,
          )
          // 8. pills pop in from random positions
          .from(
            pills,
            {
              scale: 0,
              y: 18,
              opacity: 0,
              stagger: { each: 0.07, from: "random" },
              duration: 0.5,
              ease: "back.out(2)",
            },
            0.9,
          );

        // ---- parallax across the full viewport pass ----
        gsap.fromTo(
          par,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        // ---- pointer tilt on the media ----
        const rx = gsap.quickTo(par, "rotationX", {
          duration: 0.6,
          ease: "power3",
        });
        const ry = gsap.quickTo(par, "rotationY", {
          duration: 0.6,
          ease: "power3",
        });
        const sc = gsap.quickTo(par, "scale", {
          duration: 0.6,
          ease: "power3",
        });
        const move = (e: PointerEvent) => {
          const r = img.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 10);
          rx(-py * 10);
          sc(1.06);
        };
        const leave = () => {
          rx(0);
          ry(0);
          sc(1);
        };
        img.addEventListener("pointermove", move);
        img.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          img.removeEventListener("pointermove", move);
          img.removeEventListener("pointerleave", leave);
        });
      });

      // ---- scroll-velocity skew on every image ----
      const skewers = imgs.map((el) =>
        gsap.quickTo(el, "skewY", { duration: 0.6, ease: "power3" }),
      );
      const settle = gsap
        .delayedCall(0.1, () => skewers.forEach((s) => s(0)))
        .pause();
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-4, 4, self.getVelocity() / -300);
          skewers.forEach((s) => s(v));
          settle.restart(true);
        },
      });

      return () => {
        settle.kill();
        cleanups.forEach((fn) => fn());
        splits.forEach((s) => s.revert());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="work px-[8%] pb-20 pt-14" id="work">
      <div className="container">
        <h2 className="work-heading mb-8 font-orbitron text-[1.2rem] font-semibold leading-7 text-primary">
          My Work
        </h2>

        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <article
              key={i}
              className="work-row grid gap-4 md:h-[440px] md:grid-cols-[1.45fr_1fr]"
            >
              {/* ---------- media (drop your image in .work-parallax) ---------- */}
              <div className="work-img relative h-[300px] overflow-hidden rounded-3xl bg-[#0a0a0a] md:h-full">
                <div className="work-inner absolute inset-0">
                  <div className="work-parallax absolute inset-x-0 -top-[15%] flex h-[130%] items-center justify-center">
                    {/* replace with: <img src="/work-1.jpg" alt="" className="h-full w-full object-cover" /> */}
                    <FiImage size={56} className="text-white/10" />
                  </div>
                </div>

                <div className="work-scan pointer-events-none absolute inset-x-0 z-10 h-24 bg-gradient-to-b from-transparent via-primary/25 to-transparent" />

                <svg
                  className="pointer-events-none absolute inset-0 z-10 size-full"
                  aria-hidden="true"
                >
                  <rect
                    className="work-stroke [height:calc(100%-1px)] [width:calc(100%-1px)]"
                    x="0.5"
                    y="0.5"
                    rx="24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                  />
                </svg>
              </div>

              {/* ---------- card ---------- */}
              <div
                className="work-card relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#0b0b0b] p-6 md:p-7"
                onMouseEnter={() => changeMaskSize(250)}
                onMouseLeave={revertMaskSize}
              >
                <div className="work-glow pointer-events-none absolute -bottom-12 -right-12 size-[75%] rounded-full bg-primary/40 blur-[80px]" />

                <div className="relative z-10">
                  <div className="work-label flex items-center gap-2 text-[11px] text-white">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Project
                  </div>
                  <h3 className="work-title mt-4 font-orbitron text-[clamp(1.4rem,2.2vw,2rem)] font-bold leading-tight text-white">
                    {p.title}
                  </h3>
                  <p className="work-desc mt-4 text-xs leading-5 text-white/70">
                    {p.detail}
                  </p>
                </div>

                <div className="relative z-10 mt-auto flex flex-col gap-2 pt-8">
                  <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-2">
                    {p.tags.slice(0, 3).map((t, k) => (
                      <span key={k} className={`work-pill ${pill}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-2">
                    {p.tags.slice(3, 6).map((t, k) => (
                      <span key={k} className={`work-pill ${pill}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
