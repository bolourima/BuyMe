import React, { useState } from "react";
import { AddProductBar } from "@/components/AddProductBar";
import { instance } from "@/instance";
import { Category } from "@/types/categoryType";
import { MainProducts } from "@/components/MainProducts";
import { LeftBar } from "@/components/LeftBar";
import { NavBar } from "@/components/NavBar";
import { Product } from "@/types/productType";
import { GetProductType } from "@/types/getProductType";
import DataTable from "@/components/DataTable";

export default function Home({
  categoryData,
  productData,
}: {
  categoryData: Category[];
  productData: GetProductType[];
}) {
  return (
    <>
      <NavBar />
      <main className="flex w-full min-h-screen">
        <div className="w-1/6 h-full pt-4">
          <LeftBar />
        </div>
        <div className="flex flex-col w-5/6">
          <MainProducts categoryData={categoryData} productData={productData} />
        </div>
      </main>
    </>
  );
}
export const getServerSideProps = async () => {
  try {
    const categoryRes = await instance.get("/getCategories");
    const productRes = await instance.get("/getProducts");
    const productData = productRes.data;
    const categoryData = categoryRes.data;
    return {
      props: { categoryData, productData },
    };
  } catch (error) {
    console.error("error in getSSP in index", error);
  }
};
