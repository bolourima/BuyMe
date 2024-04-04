import { Product } from "@/components/Product";
import { SubCategory } from "@/components/SubCategory";
import { Masonry } from "@/components/Masonry";
import ProductCardDtl from "@/components/productPopupDTL";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import React from "react";
import { LoveIcon } from "@/icon/LoveIcon";
import { GetServerSideProps } from "next";
import { TypeSubCategory } from "@/types/subCategoryType";
type Params = {
  category: string;
};
type Props = {
  productData: ProductType[];
};

function productList({
  productData,
  SubCategoryData,
}: {
  productData: ProductType[];
  SubCategoryData: TypeSubCategory[];
}) {
  return (
    <div className="lg:w-full flex flex-col items-center">
      <div className="lg:flex lg:gap-5 ">
        <SubCategory subCategoryData={SubCategoryData} />
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
  const SubCategoryRes = await instance.get(`/getSubcategorys/${name}`);
  const SubCategoryData = SubCategoryRes.data;
  const productData = productRes.data;
  return {
    props: { productData, SubCategoryData },
  };
};
