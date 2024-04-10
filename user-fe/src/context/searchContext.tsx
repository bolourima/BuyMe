import { ProductType } from "@/types/productType";
import { toastifyWarning } from "@/utilities/toastify";
import React, { createContext, ReactNode, useState } from "react";
type ThemContextType = {
  searchedProduct: ProductType[];
  setSearchedProduct: React.Dispatch<React.SetStateAction<ProductType[]>>;
};
type ChildrenType = {
  children: ReactNode;
};
const ProductInitial = {
  searchedProduct: [],
  setSearchedProduct: () => {},
};

export const SearchInputContext =
  createContext<ThemContextType>(ProductInitial);
export const SearchedProducts = ({ children }: ChildrenType) => {
  const [searchedProduct, setSearchedProduct] = useState<ProductType[]>([]);
  return (
    <SearchInputContext.Provider
      value={{ searchedProduct, setSearchedProduct }}
    >
      {children}
    </SearchInputContext.Provider>
  );
};
