export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  productCode: number;
  quantity: number;
  tag: string;
  disCount: DiscountType;
  categoryId: categoryIdType;
  subCategoryName: string;
  brandName: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  count: number;
};
type categoryIdType = {
  _id: string;
  name: string;
};
type DiscountType = {
  isSale: boolean;
  salePercent: number;
};
