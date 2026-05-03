import { useMaskSize } from "@/app/store";
import TextReveal from "@/components/ui/TextReveal";

const MaskedHero = () => {
  const { increase, revert } = useMaskSize();
  const maskContainerCss =
    "max-w-[58%] mx-auto flex flex-col items-center relative pt-36 pb-43.75";

  const cummaryDetails = [
    "Karachi Pakistan",
    "Specializing in Frontend Development",
    "4+ Years Experience",
  ];

  return (
    <>
      <div className={maskContainerCss}>
        <span className="uppercase tracking-widest text-center text-black text-[24px] font-semibold font-orbitron underline pb-4">
          Usama Khan
        </span>
        <h1
          className="text-2xl text-black font-bold text-center font-orbitron leading-[1.12] cursor-none"
          onMouseOver={() => increase(400)}
          onMouseLeave={revert}
        >
          <TextReveal>
            Writing Code, Breaking Things, Then Fixing Them
          </TextReveal>
        </h1>
      </div>
      <div className="container flex justify-between items-center pb-10">
        {cummaryDetails.map((item, index) => (
          <span
            onMouseOver={() => increase(100)}
            onMouseLeave={revert}
            key={index + 1}
            className="text-black font-bold font-orbitron"
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
};

export default MaskedHero;
