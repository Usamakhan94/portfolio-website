"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { useMaskSize, usePagesRef } from "@/app/store";

gsap.registerPlugin(ScrollTrigger, SplitText);

const socials = [
  { Icon: FaFacebookF, label: "Facebook", href: "#" },
  { Icon: FaInstagram, label: "Instagram", href: "#" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const setAbout = usePagesRef((state) => state.setAbout);
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);

  useLayoutEffect(() => {
    setAbout(sectionRef.current);
    return () => setAbout(null);
  }, [setAbout]);

  useGSAP(
    () => {
      if (!headingRef.current) return;
      const split = SplitText.create(headingRef.current, { type: "words" });

      gsap.set(split.words, { opacity: 0.35 });
      gsap.to(split.words, {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="about overflow-hidden px-[8%] pt-20 md:pt-28"
      id="about"
    >
      <div className="container">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="font-orbitron text-sm font-semibold tracking-wide text-foreground">
            About me
          </h2>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-[1.2fr_.8fr] md:gap-12">
          <div className="about-copy pb-16 md:pb-28">
            <div
              className="cursor-none"
              onMouseEnter={() => changeMaskSize(400)}
              onMouseLeave={revertMaskSize}
            >
              <h3
                ref={headingRef}
                className="font-orbitron text-[clamp(1.4rem,3vw,2.6rem)] font-bold uppercase leading-[1.4] text-foreground"
              >
                I’m a <span className="text-primary">skilled developer</span>{" "}
                with strong focus on fixing bugs I didn’t create &amp; producing
                high quality digital experiences.
              </h3>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-foreground/40 text-foreground transition hover:border-primary hover:text-primary"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div className="portrait-card relative mx-auto w-full max-w-md self-end md:max-w-lg">
            <div className="absolute right-[-10%] top-[10%] size-[85%] rounded-full bg-primary/25 blur-[90px]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/usama.png"
              alt="Usama"
              className="relative z-10 block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
