import React, { useState } from "react";
import { instance } from "@/instance";
import { Category } from "@/types/categoryType";
import { MainProducts } from "@/components/MainProducts";
import { LeftBar } from "@/components/LeftBar";
import { NavBar } from "@/components/NavBar";
import { GetProductType } from "@/types/getProductType";
import { string } from "yup";
import { Orders } from "@/components/Orders";
import { OrderType } from "@/types/orderType";

export default function Home({
  categoryData,
  productData,
  orderData,
}: {
  categoryData: Category[];
  productData: GetProductType[];
  orderData: OrderType[];
}) {
  const [visibleComponent, setVisibleComponent] = useState("");
  return (
    <>
      <NavBar />
      <main className="flex w-full min-h-screen">
        <div className="w-1/6 h-full pt-4">
          <LeftBar setVisibleComponent={setVisibleComponent} />
        </div>
        {visibleComponent === "product" && (
          <MainProducts categoryData={categoryData} productData={productData} />
        )}
        {visibleComponent === "order" && <Orders orderData={orderData} />}
      </main>
    </>
  );
}
export const getServerSideProps = async () => {
  try {
    const categoryRes = await instance.get("/getCategories");
    const productRes = await instance.get("/getProducts");
    const orderRes = await instance.get("/getOrdersInAdmin");
    const productData = productRes.data;
    const categoryData = categoryRes.data;
    const orderData = orderRes.data;
    return {
      props: { categoryData, productData, orderData },
    };
  } catch (error) {
    console.error("error in getSSP in index", error);
  }
};
