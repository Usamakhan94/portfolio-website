"use client";

import { usePagesRef } from "@/app/store";

export default function MaskedWork() {
  const source = usePagesRef((state) => state.work);
  return <section className="work" aria-hidden="true" style={{ height: source?.offsetHeight ?? 0 }} />;
}
