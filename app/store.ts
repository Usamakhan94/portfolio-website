import { create } from "zustand";

type MaskSize = {
  default: number;
  change: (size: number) => void;
  revert: () => void;
};

type PagesRef = {
  main: HTMLDivElement | null;
  home: HTMLDivElement | null;
  skills: HTMLDivElement | null;
  work: HTMLDivElement | null;
  contact: HTMLDivElement | null;

  setMain: (ref: HTMLDivElement | null) => void;
  setHome: (ref: HTMLDivElement | null) => void;
  setSkills: (ref: HTMLDivElement | null) => void;
  setWork: (ref: HTMLDivElement | null) => void;
  setContact: (ref: HTMLDivElement | null) => void;
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
  work: null,
  contact: null,

  setMain: (ref) => set({ main: ref }),
  setHome: (ref) => set({ home: ref }),
  setSkills: (ref) => set({ skills: ref }),
  setWork: (ref) => set({ work: ref }),
  setContact: (ref) => set({ contact: ref }),
}));
