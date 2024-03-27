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
};

export type OrderType = {
  _id: string;
  products: ProductsFromOrder[];
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
};
