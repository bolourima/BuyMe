export type ProductType = {
  name: string;
  description: string;
  price: number;
  productCode: number;
  quantity: number;
  tag: string;
  disCount: DiscountType;
  categoryId: string;
  subCategoryName: string;
  brandName: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};
type DiscountType = {
  isSale: boolean;
  salePercent: number;
};
