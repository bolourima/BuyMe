import { Product } from "@/components/Product";
import { SubCategory } from "@/components/SubCategory";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { TypeSubCategory } from "@/types/subCategoryType";
import { categoryType } from "@/types/categoryType";

function productList({
  productData,
  subCategoryBackendData,
  categoryData
}: {
  categoryData:categoryType[];
  productData: ProductType[];
  subCategoryBackendData: TypeSubCategory[];
}) {
  return (
    <div className="lg:w-full flex flex-col items-center">
      <div className="lg:flex lg:gap-5 ">
        <SubCategory subCategoryData={subCategoryBackendData} categoryData={categoryData} />
        <Product productData={productData} />
      </div>
    </div>
  );
}
export default productList;
export const getServerSideProps = async () => {

  const productRes = await instance.get(`/getProducts`);
  const subCategoryRes = await instance.get(`/getSubCategories`);
  const categoryRes = await instance.get(`/getCategories`);
  const productData = productRes.data;
  const subCategoryBackendData = subCategoryRes.data;
  const categoryData = categoryRes.data;
  console.log("bumaa",subCategoryBackendData)

  return {
    props: { productData, subCategoryBackendData,categoryData },
  };
};