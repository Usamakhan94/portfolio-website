"use client";

import { usePagesRef } from "@/app/store";

export default function MaskedServices() {
  const source = usePagesRef((state) => state.services);
  return <section className="services" aria-hidden="true" style={{ height: source?.offsetHeight ?? 0 }} />;
}
