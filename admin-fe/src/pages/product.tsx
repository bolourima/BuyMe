import { MainProducts } from "@/components/MainProducts";
import { TokenContext } from "@/contexts/TokenContext";
import { instance } from "@/instance";
import { Category } from "@/types/categoryType";
import { GetProductType } from "@/types/getProductType";
import { OrderType, productTypeForShop } from "@/types/orderType";
import { getOrders } from "@/utilities/getOrders";
import { getProducts } from "@/utilities/getProducts";
import React, { useContext, useEffect, useState } from "react";

export default function product({
  categoryData,
}: {
  categoryData: Category[];
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
    <div className="">
      <MainProducts categoryData={categoryData} productData={productData} />
    </div>
  );
}
export const getServerSideProps = async () => {
  const categoryRes = await instance.get("/getCategories");
  const categoryData = categoryRes.data;
  return {
    props: { categoryData },
  };
};
