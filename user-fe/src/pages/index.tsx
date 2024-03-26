import Product from "../components/Product";
import { instance } from "../instance";
import { ProductType } from "../types/productType";
import ProductDetail from "./productdetail";

export default function Home({ productData }: { productData: ProductType[] }) {
  return (
    <div className="bg-white p-4 m-10 rounded-lg ">
      <a href="/productList" className="">
        test for productList
      </a>
    </div>
  );
}
