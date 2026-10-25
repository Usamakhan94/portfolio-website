"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/Sections/Homepage/Hero";
import About from "@/components/Sections/Homepage/About";
import Services from "@/components/Sections/Homepage/Services";
import Work from "@/components/Sections/Homepage/Work";
import Experience from "@/components/Sections/Homepage/Experience";
import Skills from "@/components/Sections/Homepage/Skills";
import SiteHeader from "@/components/Sections/General/SiteHeader";
import SiteFooter from "@/components/Sections/General/SiteFooter";
import MaskedHome from "@/components/Sections/Homepage/MaskedHome";
import { usePagesRef } from "./store";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const setMain = usePagesRef((state) => state.setMain);

  useEffect(() => {
    setMain(mainRef.current);
    return () => setMain(null);
  }, [setMain]);

  return (
    <div className="page-root">
      <div ref={mainRef} className="portfolio-page">
        <SiteHeader />
        <main>
          <Hero />
          <About />
          <Services />
          <Work />
          <Experience />
          <Skills />
          <SiteFooter />
        </main>
      </div>
      <MaskedHome />
    </div>
  );
}


