import { Category } from "./categoryType";

export type GetProductType = {
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
};
