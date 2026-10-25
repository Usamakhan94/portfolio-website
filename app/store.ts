import { create } from "zustand";

type MaskSize = {
  default: number;
  change: (size: number) => void;
  revert: () => void;
};

type PagesRef = {
  main: HTMLDivElement | null;
  home: HTMLElement | null;
  skills: HTMLElement | null;
  about: HTMLElement | null;
  work: HTMLElement | null;
  contact: HTMLElement | null;
  services: HTMLElement | null;
  experience: HTMLElement | null;
  testimonials: HTMLElement | null;
  footer: HTMLElement | null;

  setMain: (ref: HTMLDivElement | null) => void;
  setHome: (ref: HTMLElement | null) => void;
  setSkills: (ref: HTMLElement | null) => void;
  setAbout: (ref: HTMLElement | null) => void;
  setWork: (ref: HTMLElement | null) => void;
  setContact: (ref: HTMLElement | null) => void;
  setServices: (ref: HTMLElement | null) => void;
  setExperience: (ref: HTMLElement | null) => void;
  setTestimonials: (ref: HTMLElement | null) => void;
  setFooter: (ref: HTMLElement | null) => void;
};

export const useMaskSize = create<MaskSize>((set) => ({
  default: 20,
  change: (size) => set(() => ({ default: size })),
  revert: () => set({ default: 20 }),
}));

export const usePagesRef = create<PagesRef>((set) => ({
  main: null,
  home: null,
  skills: null,
  about: null,
  work: null,
  contact: null,
  services: null,
  experience: null,
  testimonials: null,
  footer: null,

  setMain: (ref) => set({ main: ref }),
  setHome: (ref) => set({ home: ref }),
  setSkills: (ref) => set({ skills: ref }),
  setAbout: (ref) => set({ about: ref }),
  setWork: (ref) => set({ work: ref }),
  setContact: (ref) => set({ contact: ref }),
  setServices: (ref) => set({ services: ref }),
  setExperience: (ref) => set({ experience: ref }),
  setTestimonials: (ref) => set({ testimonials: ref }),
  setFooter: (ref) => set({ footer: ref }),
}));
