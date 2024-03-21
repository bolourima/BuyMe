import Image from "next/image";
import { Inter } from "next/font/google";
import { Hero } from "@/components/Hero";
import { SubCategory } from "@/components/SubCategory";
import { ProductCardOne } from "@/components/ProductCardOne";
import { ProductCardTwo } from "@/components/ProductCardTwo";
import { ProductCardThree } from "@/components/ProductCardThree";
import Product from "@/components/Product";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      {/* <SubCategory />
      <Hero /> */}
      <Product />
    </div>
  );
}
