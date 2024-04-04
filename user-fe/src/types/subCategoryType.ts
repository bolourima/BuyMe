export type TypeSubCategory = {
  _id: string;
  name: string;
  brands: typeBrand[];
  features: typeFeature[];
};
type typeBrand = [
  name: string
]

type typeFeature = {
  _id: string;
  name: string;
};
