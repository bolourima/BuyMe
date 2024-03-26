import { Hero } from "@/components/Hero";
import Product from "../components/Product";
import { instance } from "../instance";
import { ProductType } from "../types/productType";
import ProductDetail from "./productdetail";

export default function Home({ productData }: { productData: ProductType[] }) {
  return (
    <div className=" flex flex-col gap-20">
      <Hero />
      {/* <RecommendedItems productData={productData} />
      <Product productData={productData} /> */}
      <Categories />
      {/* <RecommendedItems ProductData={productData} /> */}
    </div>
  );
}
