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
  images: [];
  createdAt: string;
  updatedAt: string;
};
type categoryIdType = {
  _id: string;
  name: string;
};
type DiscountType = {
  isSale: boolean;
  salePercent: number;
};
