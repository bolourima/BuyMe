import { GetProductType } from "@/types/getProductType";

export const getInital = (onEdit: boolean, editableProduct: GetProductType) => {
  const inital = {
    name: onEdit ? editableProduct.name : "",
    description: onEdit ? editableProduct.description : "",
    productCode: onEdit ? editableProduct.productCode : 0,
    price: onEdit ? editableProduct.price : 0,
    quantity: onEdit ? editableProduct.quantity : 0,
    tag: onEdit ? editableProduct.tag : "",
  };
  return inital;
};
