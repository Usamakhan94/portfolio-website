"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { useMaskSize, usePagesRef } from "@/app/store";

const socials = [
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaLinkedinIn, label: "LinkedIn" },
];

export default function MaskedAbout() {
  const about = usePagesRef((state) => state.about);
  const changeMaskSize = useMaskSize((state) => state.change);
  const revertMaskSize = useMaskSize((state) => state.revert);

  return (
    <section
      className="about overflow-hidden px-[8%] pt-20 md:pt-28"
      style={{ height: about?.offsetHeight ?? 0 }}
    >
      <div className="container">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="font-orbitron text-sm font-semibold tracking-wide text-foreground">
            About me
          </h2>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-[1.2fr_.8fr] md:gap-12">
          <div className="about-copy pb-16 md:pb-28">
            <div
              className="cursor-none"
              onMouseEnter={() => changeMaskSize(400)}
              onMouseLeave={revertMaskSize}
            >
              <h3 className="font-orbitron text-[clamp(1.4rem,3vw,2.6rem)] font-bold uppercase leading-[1.4] text-foreground">
                I’m a <span className="text-primary">skilled developer</span>{" "}
                with strong focus on fixing bugs I didn’t create &amp; producing
                high quality digital experiences.
              </h3>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ Icon, label }) => (
                <span
                  key={label}
                  aria-hidden="true"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-foreground/40 text-foreground"
                >
                  <Icon size={13} />
                </span>
              ))}
            </div>
          </div>

          {/* identical box to the base portrait so the row height matches */}
          <div
            className="portrait-card relative mx-auto w-full max-w-md self-end md:max-w-lg"
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/usama.png"
              alt=""
              className="relative z-10 block h-auto w-full mix-blend-multiply grayscale contrast-125"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
