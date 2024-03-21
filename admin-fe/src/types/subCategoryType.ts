import { Category } from "./categoryType";

export type SubCategory = {
  _id: string;
  name: string;
  category: Category;
  brands: [
    {
      name: string;
      _id: string;
    }
  ];
};
