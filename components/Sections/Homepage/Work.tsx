"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";
import ScrollShowcase from "../General/ScrollShowcase";

const Work = () => {
  gsap.registerPlugin(ScrollTrigger);
  const mainSection = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainSection.current,
      start: "10% center",
      end: "bottom 60%",
      onToggle: (self) =>
        self.isActive
          ? document.body.classList.add("dark")
          : document.body.classList.remove("dark"),
    });
  }, {});

  const projects = [
    {
      id: 1,
      title: "Hello World",
      para: "hellow world is just a placeholder",
      src: "/portfolio-projects/aviorsol-thumbnail.jpg",
      gif: "/portfolio-projects/aviorsol-thumbnail.jpg",
    },
    {
      id: 2,
      title: "Hello World 2",
      para: "hellow world is just a placeholder",
      src: "/portfolio-projects/sartx-thumbnail.jpg",
      gif: "/portfolio-projects/sartx-thumbnail.jpg",
    },
    {
      id: 3,
      title: "Hello World 3",
      para: "hellow world is just a placeholder",
      src: "/portfolio-projects/scintillapro-thumbnail.jpg",
      gif: "/portfolio-projects/scintillapro-thumbnail.jpg",
    },
  ];

  return (
    <section ref={mainSection} className=" relative isolate min-h-screen p-5">
      <h2 className="text-9xl text-center uppercase">Work</h2>
      <div className="container">
        {projects.map((item, index) => (
          <ScrollShowcase
            project={item}
            key={index + 1}
            i={index}
            projects={projects}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
