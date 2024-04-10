import { ProductInitial } from "@/types/productInitial";
import { ProductType } from "@/types/productType";
import { createContext, ReactNode, useState } from "react";
type ChildrenType = {
  children: ReactNode;
};

export const SearchImPutContext = createContext<ProductType>(ProductInitial);
// export const SearchedProducts = ({ children }: ChildrenType) => {
//   const [searchedProduct, setSearchedProduct] = useState<ProductType>;
// };
