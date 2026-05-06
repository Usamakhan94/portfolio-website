import { useMaskSize, usePagesRef } from "@/app/store";

const MaskedSkills = () => {
  const { skills } = usePagesRef();
  const { change, revert } = useMaskSize();
  const skillSet = [
    {
      title: "Frontend Development",
      details:
        "Experience with React, Next.js, and TypeScript and also Wordpress to build responsive and user-friendly interfaces.",
    },
    {
      title: "Backend Development",
      details:
        "Familiar with Node.js and Express for building scalable backend services and APIs.",
    },
    {
      title: "UI/UX Design",
      details:
        "Skilled in creating intuitive and visually appealing designs using tools like Figma and Adobe XD.",
    },
    {
      title: "Performance Optimization",
      details:
        "Proficient in optimizing web applications for speed and efficiency, ensuring a smooth user experience.",
    },
  ];
  return <section style={{ height: skills?.clientHeight }}></section>;
};
export default MaskedSkills;
