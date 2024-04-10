import { Product } from "@/components/Product";
import { SubCategory } from "@/components/SubCategory";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import React, { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { TypeSubCategory } from "@/types/subCategoryType";
import { categoryType } from "@/types/categoryType";
import { SearchInputContext } from "@/context/searchContext";
import { getFavProducts } from "@/helper/getFavProducts";
import { ProductsInFavContext } from "@/context/ProductsInFavContext";

function productList({
  productData,
  subCategoryBackendData,
  categoryData,
}: {
  categoryData: categoryType[];
  productData: ProductType[];
  subCategoryBackendData: TypeSubCategory[];
}) {
  const { searchedProduct, setSearchedProduct } =
    useContext(SearchInputContext);
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
        <Product
          productData={
            searchedProduct.length == 0 ? productData : searchedProduct
          }
          favProducts={productsInFav}
        />
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

  return {
    props: { productData, subCategoryBackendData, categoryData },
  };
};
