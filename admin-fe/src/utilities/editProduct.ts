import { instance } from "@/instance";
import { Product } from "@/types/productType";

export const editProduct = async (
  _id: string,
  images: string[],
  values: Product,
  isSale: boolean,
  salePercent: any,
  selectedCategory: string,
  subName: string,
  selectedBrand: string,
  setEditableProduct: any,
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>,
  token: string
) => {
  try {
    const disCount = { isSale: isSale, salePercent: salePercent };
    const newProduct = {
      _id: _id,
      name: values.name,
      description: values.description,
      price: values.price,
      productCode: values.productCode,
      quantity: values.quantity,
      tag: values.tag,
      disCount: disCount,
      categoryName: selectedCategory,
      subCategoryName: subName,
      brandName: selectedBrand,
      images: images,
    };
    const res = await instance.put("/editProduct", newProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditableProduct(null);
    setOnEdit(false);
    res.status === 200 ? alert("Updated") : alert("Failed");
  } catch (error) {
    console.error("error in edit product", error);
  }
};
