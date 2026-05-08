import { useMaskSize, usePagesRef } from "@/app/store";
import TextReveal from "@/components/ui/TextReveal";

const MaskedHero = () => {
  const { change, revert } = useMaskSize();
  const { home } = usePagesRef();
  const maskContainerCss =
    "max-w-[58%] mx-auto flex flex-col items-center relative pt-36 pb-43.75";

  const cummaryDetails = [
    "Karachi Pakistan",
    "Specializing in Frontend Development",
    "4+ Years Experience",
  ];

  return (
    <section style={{ height: home?.clientHeight }}>
      <div className={maskContainerCss}>
        <span className="uppercase tracking-widest text-center text-black text-[24px] font-semibold font-orbitron underline pb-4">
          Usama Khan
        </span>
        <h1
          className="text-3xl text-black font-bold text-center font-orbitron leading-[1.12] cursor-none"
          onMouseOver={() => change(400)}
          onMouseLeave={revert}
        >
          <TextReveal>
            Writing Code, Breaking Things, Then Fixing Them
          </TextReveal>
        </h1>
      </div>
      <div className="max-w-[80%] mx-auto flex justify-between items-center pb-10">
        {cummaryDetails.map((item, index) => (
          <span
            onMouseOver={() => change(100)}
            onMouseLeave={revert}
            key={index + 1}
            className="text-black font-bold font-orbitron"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default MaskedHero;
