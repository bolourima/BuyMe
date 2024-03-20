import Image from "next/image";
import { Inter } from "next/font/google";
import { Hero } from "@/components/Hero";
import { ProductCardOne } from "@/components/ProductCardOne";
import { ProductCardTwo } from "@/components/ProductCardTwo";
import { ProductCardThree } from "@/components/ProductCardThree";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductCardOne
        img="./Img/T-shirt.png"
        price="$10.30"
        title="T-shirts with multiple colors, for men"
      />
      <ProductCardTwo
        img="./Img/Phone.png"
        rating=""
        price="$99.50"
        discount="$1128.00"
        title="GoPro HERO6 4K Action Camera - Black"
      />
      <ProductCardThree
        img="./Img/Phone.png"
        title="GoPro HERO6 4K Action Camera - Black"
        price="$998.00"
        discount="$1128.00"
        rating="7.5"
        order="154 orders"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit "
      />
    </div>
  );
}
