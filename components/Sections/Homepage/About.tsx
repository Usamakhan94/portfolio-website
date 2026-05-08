"use client";
import { usePagesRef } from "@/app/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const { setAbout } = usePagesRef();

  useLayoutEffect(() => {
    if (containerRef.current) {
      setAbout(containerRef.current);
    }
  }, [containerRef]);

  useGSAP(() => {
    if (!paraRef.current) return;

    const split = SplitText.create(paraRef.current, {
      type: "lines",
      mask: "lines",
    });

    gsap.set(split.lines, {
      display: "block",
      overflow: "hidden",
      clipPath: "inset(0 100% 0% 0%)",
    });

    gsap.to(split.lines, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      stagger: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: paraRef.current,
        start: "top 60%",
        end: "top top",
        scrub: true,
      },
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-30">
      <div className="max-w-[80%] mx-auto mb-14">
        <h2 className="tracking-widest text-sm font-medium font-orbitron text-primary">
          ABOUT ME
        </h2>
      </div>

      <div className="max-w-[80%] mx-auto relative">
        <p className="text-white/50 text-2xl font-bold font-orbitron ">
          I’m a skilled developer with strong focus on building high quality &
          impactful digital products apps.
        </p>
        <p
          ref={paraRef}
          className="text-white text-2xl font-bold  font-orbitron absolute top-0 left-0"
        >
          I’m a skilled developer with strong focus on building high quality &
          impactful digital products apps.
        </p>
      </div>
    </section>
  );
};

export default About;
