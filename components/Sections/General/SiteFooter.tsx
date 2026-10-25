"use client";

import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMaskSize, usePagesRef } from "@/app/store";

gsap.registerPlugin(ScrollTrigger);

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const setTestimonials = usePagesRef((state) => state.setTestimonials);
  const setContact = usePagesRef((state) => state.setContact);
  const setFooter = usePagesRef((state) => state.setFooter);
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);

  useLayoutEffect(() => {
    setTestimonials(testimonialRef.current);
    setContact(contactRef.current);
    setFooter(footerRef.current);
    return () => {
      setTestimonials(null);
      setContact(null);
      setFooter(null);
    };
  }, [setTestimonials, setContact, setFooter]);

  useGSAP(() => {
    gsap.fromTo(".footer-top", { y: 18, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".site-footer", start: "top 88%", once: true },
    });
  }, { scope: footerRef });

  return (
    <>
      <section ref={testimonialRef} className="testimonial mx-auto max-w-6xl px-[8%] py-16 md:py-20" id="testimonials">
        <div className="flex items-end justify-between"><div className="flex items-center gap-3 text-primary"><span className="font-orbitron text-[10px]">06</span><h2 className="font-orbitron text-xs font-semibold uppercase tracking-widest text-foreground">How I collaborate</h2></div><span className="font-serif text-8xl leading-[.6] text-primary/70">“</span></div>
        <div className="flex flex-col gap-7 border-b border-white/10 py-5 md:flex-row md:items-center md:justify-between">
          <blockquote onMouseEnter={() => changeMaskSize(280)} onMouseLeave={revertMaskSize} className="max-w-3xl cursor-none font-orbitron text-[clamp(1rem,2vw,1.3rem)] leading-relaxed text-foreground/85">“Good work starts with clear communication, shared context, and care for the details. That is how I like to collaborate on every project.”</blockquote>
          <div className="flex shrink-0 items-center gap-3"><div className="grid size-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 font-orbitron text-sm text-primary">UK</div><div><strong className="block text-xs">My approach</strong><span className="mt-1 block text-[10px] text-foreground/50">Thoughtful and detail focused</span></div></div>
        </div>
        <p className="pt-3 text-right text-[10px] text-foreground/40">Clear communication, from day one <span className="text-primary">✳</span></p>
      </section>
      <section ref={contactRef} className="contact-cta relative isolate flex flex-col items-center overflow-hidden border-y border-primary/10 bg-[#07120f] px-6 py-20 text-center" id="contact" onMouseEnter={() => changeMaskSize(300)} onMouseLeave={revertMaskSize}>
        <div className="pointer-events-none absolute -z-10 size-64 rounded-full bg-primary/20 blur-[100px]" />
        <span className="text-[10px] uppercase tracking-[.18em] text-primary">Have a good one in mind?</span>
        <h2 className="mt-4 font-orbitron text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-tight">Let’s create something<br />that stands out.</h2>
        <p className="mt-3 text-xs text-foreground/55">Tell me a little about what you’re building. I’d love to hear about it.</p>
        <a className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold text-black transition hover:scale-105" href="mailto:usamakhan@gmail.com">Start a conversation <ArrowRight size={15} /></a>
      </section>
      <footer ref={footerRef} className="bg-black px-[8%] pb-5 pt-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-6">
          <a className="flex items-center gap-2 font-orbitron text-xs font-bold" href="#home"><span className="grid size-7 place-items-center rounded-full bg-primary text-black">U</span><span>Usama Khan</span></a>
          <p className="text-[10px] leading-5 text-foreground/50">Building for the web,<br />with care and curiosity.</p>
          <a className="inline-flex items-center gap-1 text-[10px] text-foreground/65 hover:text-primary" href="#home">Back to top <ArrowUpRight size={13} /></a>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 py-7 text-[10px] text-foreground/55 md:grid-cols-3">
          <div className="flex flex-col gap-2"><h3 className="mb-1 font-orbitron text-xs text-foreground">Explore</h3><a href="#about">About me</a><a href="#services">Services</a><a href="#work">Selected work</a><a href="#experience">Experience</a></div>
          <div className="flex flex-col gap-2"><h3 className="mb-1 font-orbitron text-xs text-foreground">Contact</h3><a href="mailto:usamakhan@gmail.com">usamakhan@gmail.com</a><a href="#contact">Start a project</a></div>
          <div className="flex flex-col gap-2"><h3 className="mb-1 font-orbitron text-xs text-foreground">Based in</h3><span>Karachi, Pakistan</span><span>Available for select projects</span></div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-white/10 pt-3 text-[9px] text-foreground/35"><span>© {new Date().getFullYear()} Usama Khan</span><span>Designed &amp; built with care.</span></div>
      </footer>
    </>
  );
}


