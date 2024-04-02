import { instance } from "@/instance";
import { Product } from "@/types/productType";
export const createProduct = async (
  images: string[],
  values: Product,
  isSale: boolean,
  salePercent: any,
  selectedCategory: string,
  subName: string,
  selectedBrand: string,
  token: string
) => {
  try {
    const disCount = { isSale: isSale, salePercent: salePercent };
    const newProduct = {
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
    const res = await instance.post("/createProduct", newProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.status === 201 ? alert("Created") : alert("Failed");
  } catch (error) {
    console.error(error);
    return alert("Product code coincided");
  }
};
