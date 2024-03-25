import { ProductType } from "@/types/productType";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  productsInBasket: ProductType[];
  setProductsInBasket: React.Dispatch<React.SetStateAction<ProductType[]>>;
};
const iContextState = {
  productsInBasket: [],
  setProductsInBasket: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const ProductsInBasketContext =
  createContext<ThemContextType>(iContextState);
export const ProductsInBasket = ({ children }: ChildrenType) => {
  const [productsInBasket, setProductsInBasket] = useState<ProductType[]>([]);
  return (
    <ProductsInBasketContext.Provider
      value={{ productsInBasket, setProductsInBasket }}
    >
      {children}
    </ProductsInBasketContext.Provider>
  );
};
