import { ProductType } from "@/types/productType";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  productsInFav: ProductType[];
  setProductsInFav: React.Dispatch<React.SetStateAction<ProductType[]>>;
};
const iContextState = {
  productsInFav: [],
  setProductsInFav: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const ProductsInFavContext =
  createContext<ThemContextType>(iContextState);
export const ProductsInFav = ({ children }: ChildrenType) => {
  const [productsInFav, setProductsInFav] = useState<ProductType[]>([]);
  return (
    <ProductsInFavContext.Provider value={{ productsInFav, setProductsInFav }}>
      {children}
    </ProductsInFavContext.Provider>
  );
};
