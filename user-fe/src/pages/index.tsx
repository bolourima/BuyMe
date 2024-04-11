import { Hero } from "@/components/Hero";
import { MobileHero } from "@/components/MobileHero";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Buy Me"
        description="Buy me e-commerce site"
        openGraph={{
          images: [
            {
              url: "./Buy.png",
              width: 800,
              height: 600,
              alt: "Home thumbnail",
            },
          ],
        }}
      />
      <div className=" static flex flex-col gap-20">
        <Hero />
        <MobileHero />
      </div>
    </>
  );
}
