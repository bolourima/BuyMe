import { ProductTypeWithQuantity } from "./productWithQuantityType";
import { UserType } from "./userType";

export type OrderType = {
  _id: string;
  products: ProductTypeWithQuantity[];
  orderNumber: number;
  user: UserType;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  invoiceId: string;
  paymentStatus: string;
  deliveryStatus: string;
  __v: number;
};
