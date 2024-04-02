import { number } from "yup";
import { ProductType } from "./productType";

export type ProductTypeWithQuantity = {
  selectedProductQuantity: number;
  product: ProductType;
  _id: string;
};
