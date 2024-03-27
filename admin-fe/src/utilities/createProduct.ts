import { instance } from "@/instance";
import { Product } from "@/types/productType";
export const createProduct = async (
  values: Product,
  images: File[],
  isSale: boolean,
  salePercent: any,
  selectedCategory: string,
  subName: string,
  selectedBrand: string
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
    };
    const formData = new FormData();
    formData.append("product", JSON.stringify(newProduct));
    if (!images) {
      return alert("No images");
    }
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    const res = await instance.post("/createProduct", formData);
    return res.status;
  } catch (error) {
    console.error(error);
    return alert("Product code coincided");
  }
};
