import { Product } from "@/components/Product";
import { SubCategory } from "@/components/SubCategory";
import { instance } from "@/instance";
import React, { useContext, useEffect, useState } from "react";
import { TypeSubCategory } from "@/types/subCategoryType";
import { categoryType } from "@/types/categoryType";
import { getFavProducts } from "@/helper/getFavProducts";
import { ProductsInFavContext } from "@/context/ProductsInFavContext";

function productList({
  subCategoryBackendData,
  categoryData,
}: {
  categoryData: categoryType[];
  subCategoryBackendData: TypeSubCategory[];
}) {
  const { productsInFav, setProductsInFav } = useContext(ProductsInFavContext);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    getFavProducts(accessToken, setProductsInFav);
  }, []);
  return (
    <div className="lg:w-full flex flex-col items-center">
      <div className="lg:flex lg:gap-5 ">
        <SubCategory
          subCategoryData={subCategoryBackendData}
          categoryData={categoryData}
        />
        <Product productData={[]} favProducts={productsInFav} />
      </div>
    </div>
  );
}
export default productList;
export const getServerSideProps = async () => {
  const subCategoryRes = await instance.get(`/getSubCategories`);
  const categoryRes = await instance.get(`/getCategories`);
  const subCategoryBackendData = subCategoryRes.data;
  const categoryData = categoryRes.data;

  return {
    props: { subCategoryBackendData, categoryData },
  };
};
