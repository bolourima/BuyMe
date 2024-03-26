export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  productCode: number;
  quantity: number;
  tag: string;
  disCount: DiscountType;
  categoryId: { _id: string; name: string };
  subCategoryName: string;
  brandName: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  count: number;
};
type DiscountType = {
  isSale: boolean;
  salePercent: number;
};
