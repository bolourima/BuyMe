import { Category } from "./categoryType";

type ProductsFromOrder = {
  _id: string;
  name: string;
  description: string;
  price: number;
  productCode: number;
  quantity: number;
  tag: string;
  disCount: { isSale: boolean; salePercent: number };
  categoryId: Category;
  subCategoryName: string;
  brandName: string;
  createdAt: string;
  images: string[];
  selectedQuantity: number;
  shopId: { bankAccount: number; email: string; shopName: string };
};
export type OrderType = {
  _id: string;
  products: { product: ProductsFromOrder; selectedProductQuantity: number }[];
  orderNumber: number;
  user: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: number;
    password: string;
    __v: number;
  };
  total: number;
  createdAt: Date;
  updatedAt: Date;
  deliveryStatus: string;
  paymentStatus: string;
  address: {
    addressName: string;
    city: string;
    district: string;
    khoroo: string | number;
    building: string;
    deliveryNote: string;
  };
};
export type productTypeForShop = {
  product: ProductsFromOrder;
  selectedProductQuantity: number;
  user: string;
  orderNumber: number;
  createdAt: Date;
}[];
