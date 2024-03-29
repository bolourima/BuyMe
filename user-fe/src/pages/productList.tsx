import Product from "@/components/Product";
import { SubCategory } from "@/components/SubCategory";
import Masonry from "@/components/Masonry";
import ProductCardDtl from "@/components/productPopupDTL";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import React from "react";
import { LoveIcon } from "@/icon/LoveIcon";

export default function productList({
  productData,
}: {
  productData: ProductType[];
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="lg:flex lg:gap-5 ">
        <SubCategory />
        <Product productData={productData} />
        {/* <ProductCardDtl /> */}
      </div>
      {/* <Masonry /> */}
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
