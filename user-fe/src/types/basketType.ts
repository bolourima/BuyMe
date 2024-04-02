import { ProductTypeWithQuantity } from "./productWithQuantityType";
import { UserType } from "./userType";

export type BasketType = {
  _id: string;
  user: UserType;
  products: ProductTypeWithQuantity[];
};
