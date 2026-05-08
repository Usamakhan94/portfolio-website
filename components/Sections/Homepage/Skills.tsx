"use client";
import { useMaskSize, usePagesRef } from "@/app/store";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLHeadingElement[]>([]);
  const { setSkills } = usePagesRef();
  const { change, revert } = useMaskSize();

  useLayoutEffect(() => {
    if (containerRef.current) {
      setSkills(containerRef.current);
    }
  }, [containerRef]);

  const skillSet = [
    {
      title: "Frontend",
      details:
        "Expert in React and Next.js with TypeScript, crafting high-performance, interactive UIs with advanced animations (GSAP), masking effects, and modern rendering techniques.",
    },
    {
      title: "Backend & APIs",
      details:
        "Building scalable backend systems using Node.js and Express, designing clean APIs, and integrating full-stack features for real-world applications.",
    },
    {
      title: "UI/UX",
      details:
        "Designing intuitive, conversion-focused interfaces using Figma and Adobe XD, with a strong eye for detail, usability, and modern design trends.",
    },
    {
      title: "WordPress",
      details:
        "Developing custom WordPress solutions including Elementor-based systems, dynamic content structures, and advanced WooCommerce customizations.",
    },
    {
      title: "Optimization",
      details:
        "Optimizing applications for speed, SEO, and scalability using best practices in rendering, code-splitting, and asset management.",
    },
  ];

  useGSAP(() => {
    headingsRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        },
      );
    });
  }, {});

  return (
    <section ref={containerRef} className="py-30">
      <div>
        <div className="max-w-[80%] mx-auto mb-14">
          <h2 className=" tracking-widest text-sm font-medium font-orbitron text-primary">
            WHAT I DO
          </h2>
        </div>
        <div>
          {skillSet.map((skill, index) => (
            <div
              onMouseOver={() => change(0)}
              onMouseLeave={() => revert()}
              key={index + 1}
              className="relative isolate z-20 border-y border-white/20 py-2 first:border-t group perspective-none"
            >
              <div className="relative max-w-[80%] mx-auto flex justify-between items-center">
                <h3 className="text-3xl leading-none font-bold font-orbitron text-white/50 uppercase">
                  {skill.title}
                </h3>
                <h3
                  ref={(el) => {
                    if (el) headingsRef.current[index] = el;
                  }}
                  className="text-3xl text-white absolute top-0 left-0 leading-none font-bold font-orbitron uppercase [clip-path:inset(0_0_0_0)]"
                  style={{ willChange: "clip-path" }}
                >
                  {skill.title}
                </h3>
              </div>
              <div className="  bg-white absolute top-0 left-0 w-full h-full [clip-path:inset(50%_0_50%_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-all duration-300">
                <div className="max-w-[80%] mx-auto flex justify-between items-center">
                  <h3 className="text-3xl font-bold font-orbitron text-black/90 uppercase">
                    {skill.title}
                  </h3>
                  <p className="text-xsm text-muted-foreground max-w-[500px]">
                    {skill.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
