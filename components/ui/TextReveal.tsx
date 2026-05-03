"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { ReactNode, useRef } from "react";

const TextReveal = ({ children }: { children: ReactNode }) => {
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);
  const textRef = useRef<null | HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (textRef.current == null) return;
      let split = SplitText.create(textRef.current, { type: "words, chars" });
      gsap.from(split.chars, {
        duration: 0.5,
        y: -150,
        rotateZ: -20,
        stagger: 0.025,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });

      return () => split.revert();
    },
    { scope: textRef },
  );

  return (
    <span ref={textRef} className="[&>div]:overflow-hidden">
      {children}
    </span>
  );
};

export default TextReveal;
