"use client";

import { usePagesRef } from "@/app/store";

export default function MaskedContact() {
  const source = usePagesRef((state) => state.contact);
  return <section className="contact-cta" aria-hidden="true" style={{ height: source?.offsetHeight ?? 0 }} />;
}
