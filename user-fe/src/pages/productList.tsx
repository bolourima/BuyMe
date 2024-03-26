import Product from "@/components/Product";
import { SubCategory } from "@/components/SubCategory";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import React from "react";

export default function productList({
  productData,
}: {
  productData: ProductType[];
}) {
  return (
    <div className="">
      <div className="lg:flex lg:gap-5">
        <SubCategory />
        <Product productData={productData} />
      </div>
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
