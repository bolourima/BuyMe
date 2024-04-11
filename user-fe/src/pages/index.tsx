import { Hero } from "@/components/Hero";
import { MobileHero } from "@/components/MobileHero";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo title="Buy Me" description="Buy me e-commerce site" />
      <div className=" static flex flex-col gap-20">
        <Hero />
        <MobileHero />
      </div>
    </>
  );
}
