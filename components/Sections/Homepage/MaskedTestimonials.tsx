"use client";

import { usePagesRef } from "@/app/store";

export default function MaskedTestimonials() {
  const source = usePagesRef((state) => state.testimonials);
  return <section className="testimonial" aria-hidden="true" style={{ height: source?.offsetHeight ?? 0 }} />;
}
