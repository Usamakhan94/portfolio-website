"use client";

import { usePagesRef } from "@/app/store";

export default function MaskedSkills() {
  const source = usePagesRef((state) => state.skills);
  return <section className="toolkit" aria-hidden="true" style={{ height: source?.offsetHeight ?? 0 }} />;
}
