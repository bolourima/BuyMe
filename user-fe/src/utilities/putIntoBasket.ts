import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { headers } from "next/headers";
import { useContext, useState } from "react";
export const putIntoBasket = async (
  product: ProductTypeWithQuantity,
  productsInBasket: ProductTypeWithQuantity[],
  setProductsInBasket: React.Dispatch<
    React.SetStateAction<ProductTypeWithQuantity[]>
  >,
  token: string
) => {
  const res = await instance.put(`/basket/${product._id}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const coincidenceChecker: ProductTypeWithQuantity[] = productsInBasket.filter(
    (el) => {
      return el._id === product._id;
    }
  );
  if (coincidenceChecker.length == 0) {
    setProductsInBasket([
      ...productsInBasket,
      { ...product, selectedProductQuantity: 1 },
    ]);
  } else {
    let indexFinder: number = 0;
    for (let i = 0; i < productsInBasket.length; i++) {
      if (product._id === productsInBasket[i]._id) {
        indexFinder = i;
        break;
      }
    }
    const newProduct = {
      ...product,
      selectedQuantity:
        productsInBasket[indexFinder].selectedProductQuantity + 1,
    };
    const previosProducts: ProductTypeWithQuantity[] = productsInBasket.filter(
      (el, i) => {
        return i < indexFinder;
      }
    );
    const nextProducts: ProductTypeWithQuantity[] = productsInBasket.filter(
      (el, i) => {
        return i > indexFinder;
      }
    );
    setProductsInBasket([...previosProducts, newProduct, ...nextProducts]);
  }
};
