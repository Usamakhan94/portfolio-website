"use client";

import { usePagesRef } from "@/app/store";

export default function MaskedFooter() {
  const source = usePagesRef((state) => state.footer);
  return <footer className="site-footer" aria-hidden="true" style={{ height: source?.offsetHeight ?? 0 }} />;
}
