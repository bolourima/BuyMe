import Image from "next/image";
import { Inter } from "next/font/google";
import { Hero } from "@/components/Hero";
import { SubCategory } from "@/components/SubCategory";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <SubCategory />
      <Hero />
    </div>
  );
}
