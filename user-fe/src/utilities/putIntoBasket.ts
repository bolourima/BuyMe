import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { ProductType } from "@/types/productType";
import { useContext } from "react";
export const putIntoBasket = async (
  product: ProductType,
  productsInBasket: ProductType[],
  setProductsInBasket: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
  setProductsInBasket([...productsInBasket, product]);
};
