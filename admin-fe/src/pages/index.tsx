import React, { useState } from "react";
import { AddProductBar } from "@/components/AddProductBar";
import { instance } from "@/instance";
import { Category } from "@/types/categoryType";

export default function Home({ categoryData }: { categoryData: Category[] }) {
  return (
    <>
      <div>
        <AddProductBar categoryData={categoryData} />
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  try {
    const res = await instance.get("/getCategories");
    const categoryData = res.data;
    return {
      props: { categoryData },
    };
  } catch (error) {
    console.error("error in getSSP in index", error);
  }
};
