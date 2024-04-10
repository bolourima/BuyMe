import { Hero } from "@/components/Hero";
import { MobileHero } from "@/components/MobileHero";

export default function Home() {
  return (
    <div className=" static flex flex-col gap-20">
      <Hero />
      <MobileHero />
    </div>
  );
}
