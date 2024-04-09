import { MainProducts } from "@/components/MainProducts";
import { instance } from "@/instance";
import { Category } from "@/types/categoryType";
import { GetProductType } from "@/types/getProductType";
import { getProducts } from "@/utilities/getProducts";
import { useEffect, useState } from "react";

export default function product({
  categoryData,
}: {
  categoryData: Category[];
}) {
  const [productData, setProductData] = useState<GetProductType[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    getProducts(token, setProductData);
  }, []);
  return <MainProducts categoryData={categoryData} productData={productData} />;
}
export const getServerSideProps = async () => {
  const categoryRes = await instance.get("/getCategories");
  const categoryData = categoryRes.data;
  return {
    props: { categoryData },
  };
};
