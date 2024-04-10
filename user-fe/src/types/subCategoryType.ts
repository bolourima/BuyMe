import { categoryType } from "./categoryType";

export type TypeSubCategory = {
  _id: string;
  name: string;
  category: categoryType;
  brands: typeBrand[];
  features: typeFeature[];
};
type typeBrand = [name: string];

type typeFeature = {
  _id: string;
  name: string;
};
