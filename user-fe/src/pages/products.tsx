import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import React, { useContext, useEffect, useState } from "react";

const Products = ({
  productData,
}: {
  productData: ProductTypeWithQuantity[];
}) => {
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const [token, setToken] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    setToken(accessToken);
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center gap-16 text-black relative">
      {productData.map((product) => {
        return (
          <div className="flex flex-col justify-start w-fit h-fit border-2 border-black border-solid p-12 gap-4 rounded-lg">
            <div className="flex gap-4">
              {product.product.images.map((img) => {
                return <img className="w-[100px] h-[150px]" src={img} />;
              })}
            </div>
            <p>Name: {product.product.name}</p>
            <p>Category: {product.product.categoryId.name}</p>
            <p>SubCategory: {product.product.subCategoryName}</p>
            <p>Brand: {product.product.brandName}</p>
            <p>Price: {product.product.price.toLocaleString()}</p>
            <p>
              Discount:
              {product.product.disCount.isSale
                ? "   " + product.product.disCount.salePercent + "%"
                : "   Хямдралгүй байна"}
            </p>
            <p>Tags: {product.product.tag}</p>
            <p>Created at: {product.product.createdAt}</p>
            <button
              onClick={() => {
                putIntoBasket(
                  product,
                  productsInBasket,
                  setProductsInBasket,
                  token
                );
              }}
              className="w-full h-16 bg-black text-white rounded-lg"
            >
              Put into basket
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
export const getServerSideProps = async () => {
  const res = await instance.get("/getProducts");
  const productData = res.data;
  return {
    props: {
      productData,
    },
  };
};
