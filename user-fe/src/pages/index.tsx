// import Image from "next/image";
// import { Inter } from "next/font/google";
import { Hero } from "@/components/Hero";
import { SubCategory } from "@/components/SubCategory";
import { ProductCardOne } from "@/components/ProductCardOne";
import { ProductCardTwo } from "@/components/ProductCardTwo";
import { ProductCardThree } from "@/components/ProductCardThree";
import Product from "@/components/Product";
import RecommendedItems from "@/components/RecommendedItems";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductFilterRecent } from "@/components/ProductFilterRecent";

<<<<<<< HEAD
export default function Home() {
=======
const inter = Inter({ subsets: ["latin"] });

export default function Home({ productData }: { productData: ProductType[] }) {
  console.log(productData);
>>>>>>> main
  return (
    <div>
      {/* 
      <Hero /> */}
<<<<<<< HEAD
      {/* <RecommendedItems />
      <Product /> */}
=======
      {/* <RecommendedItems productData={productData} /> */}
      <Product productData={productData} />
>>>>>>> main
    </div>
  );
}

export const getServerSideProps = async () => {
  const productRes = await instance.get("/getProducts");
  const productData = productRes.data;
  return {
    props: { productData },
  };
};
