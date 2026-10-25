"use client";

import { usePagesRef } from "@/app/store";

export default function MaskedExperience() {
  const source = usePagesRef((state) => state.experience);
  return <section className="experience" aria-hidden="true" style={{ height: source?.offsetHeight ?? 0 }} />;
}
