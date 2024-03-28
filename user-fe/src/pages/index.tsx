import { Hero } from "@/components/Hero";
import Product from "../components/Product";
import { instance } from "../instance";
import { ProductType } from "../types/productType";

import Categories from "@/components/Categories";
import RecommendedItems from "@/components/RecommendedItems";

export default function Home({ productData }: { productData: ProductType[] }) {
  return (
    <div className=" flex flex-col gap-20">
      <Hero />
      {/* <RecommendedItems productData={productData} />
      <Product productData={productData} /> */}
      {/* <Categories /> */}
      {/* <RecommendedItems ProductData={productData} /> */}
      {/* <RecommendedItems ProductData={productData} /> */}
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
