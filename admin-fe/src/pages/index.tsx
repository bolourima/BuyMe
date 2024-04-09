import React, { useContext, useEffect, useState } from "react";
import { instance } from "@/instance";
import { Category } from "@/types/categoryType";
import { MainProducts } from "@/components/MainProducts";
import { LeftBar } from "@/components/LeftBar";
import { NavBar } from "@/components/NavBar";
import { GetProductType } from "@/types/getProductType";
import DataTable from "@/components/DataTable";
import { string } from "yup";
import { Orders } from "@/components/Orders";
import { OrderType, productTypeForShop } from "@/types/orderType";
import { getOrders } from "@/utilities/getOrders";
import { getProducts } from "@/utilities/getProducts";
import { Product } from "@/types/productType";
import { TokenContext } from "@/contexts/TokenContext";

export default function Home({
  categoryData,
}: // productData,
// orderData,
{
  categoryData: Category[];
  // productData: GetProductType[];
  // orderData: OrderType[];
}) {
  const [visibleComponent, setVisibleComponent] = useState("");
  const [orderData, setOrderData] = useState<productTypeForShop[]>([]);
  const { token, setToken } = useContext(TokenContext);
  const [productData, setProductData] = useState<GetProductType[]>([]);
  const setProduct = (data: GetProductType[]) => {
    setProductData(data);
  };
  const setOrder = (data: productTypeForShop[]) => {
    setOrderData(data);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setToken(token);
    getProducts(token, setProduct);
    getOrders(token, setOrder);
  }, []);
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
  const categoryRes = await instance.get("/getCategories");
  const categoryData = categoryRes.data;
  return {
    props: { categoryData },
  };
};
