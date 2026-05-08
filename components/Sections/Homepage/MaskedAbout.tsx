import { useMaskSize, usePagesRef } from "@/app/store";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MaskedAbout = () => {
  const { about } = usePagesRef();
  const { change, revert } = useMaskSize();

  return (
    <section style={{ height: about?.clientHeight }} className="py-30">
      <div className="max-w-[80%] mx-auto mb-14">
        <h2 className="tracking-widest text-sm font-medium font-orbitron text-primary">
          ABOUT ME
        </h2>
      </div>

      <div className="max-w-[80%] mx-auto relative">
        <p
          onMouseOver={() => change(400)}
          onMouseLeave={revert}
          className="text-black text-2xl font-bold font-orbitron "
        >
          I’m a skilled developer with strong focus on fixing bugs I didn’t
          create & producing high quality digital experiences.
        </p>
      </div>
    </section>
  );
};

export default MaskedAbout;
