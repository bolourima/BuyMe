import { SearchInputContext } from "@/context/searchContext";
import { useContext } from "react";
import { filterWithCategory } from "./searchProduct";
import { ProductType } from "@/types/productType";

export const filterBrandName = (
  value: number[],
  setSearchedProduct: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
  filterWithCategory(value, setSearchedProduct);
};
