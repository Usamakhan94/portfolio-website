"use client";
import Hero from "@/components/Sections/Homepage/Hero";
import MaskedHome from "@/components/Sections/Homepage/MaskedHome";
import Skills from "@/components/Sections/Homepage/Skills";
import Work from "@/components/Sections/Homepage/Work";
import { useEffect, useRef } from "react";
import { usePagesRef } from "./store";
import About from "@/components/Sections/Homepage/About";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { setMain } = usePagesRef();

  useEffect(() => {
    if (mainRef.current) {
      setMain(mainRef.current);
    }
  }, [mainRef]);

  return (
    <>
      <main ref={mainRef} className="">
        <Hero />
        <Skills />
        <About />
        <Work />
      </main>
      <MaskedHome />
      {/* <WebGLSpotlight /> */}
    </>
  );
}
