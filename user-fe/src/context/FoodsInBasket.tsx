import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  productsInBasket: ProductTypeWithQuantity[];
  setProductsInBasket: React.Dispatch<
    React.SetStateAction<ProductTypeWithQuantity[]>
  >;
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
  const [productsInBasket, setProductsInBasket] = useState<
    ProductTypeWithQuantity[]
  >([]);
  return (
    <ProductsInBasketContext.Provider
      value={{ productsInBasket, setProductsInBasket }}
    >
      {children}
    </ProductsInBasketContext.Provider>
  );
};
