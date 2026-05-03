import Hero from "@/components/Sections/Homepage/Hero";
import MaskedHome from "@/components/Sections/Homepage/MaskedHome";
import Work from "@/components/Sections/Homepage/Work";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Work />
      </main>
      <MaskedHome />
      {/* <WebGLSpotlight /> */}
    </>
  );
}
