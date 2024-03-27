import { ProductType } from "../types/productType";

export default function Home({ productData }: { productData: ProductType[] }) {
  return (
    <div className="bg-white p-4 m-10 rounded-lg ">
      <a href="/productList" className="">
        test for productList
      </a>
    </div>
  );
}
