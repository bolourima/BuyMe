export type TypeSubCategory = {
  _id: string;
  categoryName: string;
  brands: typeBrand[];
  features: typeFeature[];
};
type typeBrand = {
  _id: string;
  name: string;
};

type typeFeature = {
  _id: string;
  name: string;
};
