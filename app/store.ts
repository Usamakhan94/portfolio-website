import { create } from "zustand";

type MaskSize = {
  default: number;
  increase: (size: number) => void;
  revert: () => void;
};

export const useMaskSize = create<MaskSize>((set) => ({
  default: 20,
  increase: (size) => set(() => ({ default: size })),
  revert: () => set({ default: 20 }),
}));
