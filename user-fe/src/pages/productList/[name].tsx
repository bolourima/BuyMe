import { Product } from "@/components/Product";
import { SubCategory } from "@/components/SubCategory";
import { Masonry } from "@/components/Masonry";
import ProductCardDtl from "@/components/productPopupDTL";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import React from "react";
import { LoveIcon } from "@/icon/LoveIcon";
import { GetServerSideProps } from "next";
type Params = {
  category: string;
};
type Props = {
  productData: ProductType[];
};

function productList({ productData }: { productData: ProductType[] }) {
  return (
    <div className="lg:w-full flex flex-col items-center">
      <div className="lg:flex lg:gap-5 ">
        <SubCategory />
        <Product productData={productData} />
      </div>
    </div>
  );
}
export default productList;
export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  params
) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const { name } = params.query;
  const productRes = await instance.get(`/getProducts/${name}`);
  const productData = productRes.data;
  return {
    props: { productData },
  };
};
