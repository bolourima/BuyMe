import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { Dispatch, SetStateAction } from "react";

export const emptyBasket = (
  setProductsInBasket: Dispatch<SetStateAction<ProductTypeWithQuantity[]>>
) => {
  setProductsInBasket([]);
};
